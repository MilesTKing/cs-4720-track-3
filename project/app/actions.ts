'use server'

import {PrismaClient} from "@/prisma/generated/prisma/client";
import {PrismaNeon} from "@prisma/adapter-neon";
import {revalidatePath} from "next/cache";
import {cookies} from 'next/headers';
import crypto from "crypto";
import { PutObjectCommand} from "@aws-sdk/client-s3";
import { s3 } from "@/app/lib/s3";

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({adapter});

export async function createAccount(
    prevState: { success: boolean, message: string },
    formData: FormData
) {

    const username = String(formData.get("username"));

    const exists = await prisma.users.findUnique({
        where: {
            username
        }
    });

    if (exists) {
        return {
            success: false,
            message: "Username already exists."
        };
    }
    const file: File | null= formData.get("profilePicture")
    let imageUrl= ""
    if(file){
        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);
        const key =
            `profile-pictures/${crypto.randomUUID()}-${file.name}`;
        await uploadPicture(buffer, key, file)
        imageUrl =
            `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }

    await prisma.users.create({
        data: {
            username,
            password: String(formData.get("password")),
            name: String(formData.get("name")),
            bio: String(formData.get("bio")),

            twitter: String(formData.get("twitter") || ""),
            instagram: String(formData.get("instagram") || ""),
            facebook: String(formData.get("facebook") || ""),

            profilePic: imageUrl,
            friends: []
        }
    });

    revalidatePath("/");

    return {
        success: true,
        message: "Account created."
    };
}

export async function login(
    prevState: { success: boolean, message: string },
    formData: FormData
) {

    const username = String(formData.get("username"));

    const users = await prisma.users.findUnique({
        where: {username}
    });

    if (!users) {
        return {
            success: false, message: "User not found."
        };
    }
    const cookieStore = await cookies();

    cookieStore.set("username", users.username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });

    return {
        success: true,
        message: "Logged in."
    };
    return {
        success: true, message: "Logged in."
    };
}

export async function getCurrentUser() {

    const cookieStore = await cookies();

    const username = cookieStore.get("username")?.value;

    if (!username) return null;

    return prisma.users.findUnique({
        where: {
            username
        }
    });
}
export async function searchUsers(username: string) {

    if (!username.trim()) return [];

    return prisma.users.findMany({
        where: {
            username: {
                contains: username,
                mode: "insensitive"
            }
        },
        select: {
            username: true,
            name: true,
            profilePic: true,
            bio: true,
            id: true,
        }
    });
}

export async function logout() {
    const cookieStore = await cookies();

    cookieStore.delete("username");
}
export async function sendFriendRequest(
    prevState: { success: boolean; message: string },
    formData: FormData
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return {
            success: false,
            message: "You must be logged in."
        };
    }

    const receiverId = Number(formData.get("receiverId"));

    if (receiverId === currentUser.id) {
        return {
            success: false,
            message: "You cannot add yourself."
        };
    }

    const receiver = await prisma.users.findUnique({
        where: {
            id: receiverId
        }
    });

    if (!receiver) {
        return {
            success: false,
            message: "User not found."
        };
    }

    const existing = await prisma.friendrequest.findFirst({
        where: {
            OR: [
                {
                    senderId: currentUser.id,
                    receiverId
                },
                {
                    senderId: receiverId,
                    receiverId: currentUser.id
                }
            ]
        }
    });

    if (existing) {
        return {
            success: false,
            message: "Friend request already exists."
        };
    }

    await prisma.friendrequest.create({
        data: {
            senderId: currentUser.id,
            receiverId
        }
    });

    revalidatePath("/friends");

    return {
        success: true,
        message: "Friend request sent."
    };
}

export async function getFriendRequests() {

    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    return prisma.friendrequest.findMany({
        where: {
            receiverId: currentUser.id,
            status: "PENDING"
        },
        include: {
            sender: true
        }
    });

}

export async function acceptFriendRequest(
    prevState: { success: boolean; message: string },
    formData: FormData
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return {
            success: false,
            message: "Not logged in."
        };
    }

    const requestId = Number(formData.get("requestId"));

    const request = await prisma.friendrequest.findUnique({
        where: {
            id: requestId
        }
    });

    if (!request || request.receiverId !== currentUser.id) {
        return {
            success: false,
            message: "Invalid request."
        };
    }

    await prisma.users.update({
        where: {
            id: request.senderId
        },
        data: {
            friends: {
                push: currentUser.id
            }
        }
    });

    await prisma.users.update({
        where: {
            id: currentUser.id
        },
        data: {
            friends: {
                push: request.senderId
            }
        }
    });

    await prisma.friendrequest.update({
        where: {
            id: request.id
        },
        data: {
            status: "ACCEPTED"
        }
    });

    revalidatePath("/friends");

    return {
        success: true,
        message: "Friend request accepted."
    };
}

export async function declineFriendRequest(
    prevState: { success: boolean; message: string },
    formData: FormData
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return {
            success: false,
            message: "Not logged in."
        };
    }

    const requestId = Number(formData.get("requestId"));

    const request = await prisma.friendrequest.findUnique({
        where: {
            id: requestId
        }
    });

    if (!request || request.receiverId !== currentUser.id) {
        return {
            success: false,
            message: "Invalid request."
        };
    }

    await prisma.friendrequest.update({
        where: {
            id: request.id
        },
        data: {
            status: "DECLINED"
        }
    });

    revalidatePath("/friends");

    return {
        success: true,
        message: "Friend request declined."
    };
}
export async function uploadPicture(buffer: Buffer<ArrayBuffer>, key: string, file: File){

    await s3.send(

        new PutObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: key,

            Body: buffer,

            ContentType: file.type,
            ACL: "public-read",

        })

    );
}

export async function uploadPhoto(
    prevState: { success: boolean; message: string },
    formData: FormData
) {

    const user = await getCurrentUser();

    if (!user) {
        return {
            success: false,
            message: "Please log in."
        };
    }

    const file = formData.get("photo") as File;

    if (!file || file.size === 0) {
        return {
            success: false,
            message: "No file selected."
        };
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const key =
        `posts/${user.id}/${crypto.randomUUID()}-${file.name}`;

    await s3.send(new PutObjectCommand({

        Bucket: process.env.AWS_BUCKET_NAME,

        Key: key,

        Body: buffer,

        ContentType: file.type,
        ACL: "public-read",

    }));

    const imageUrl =
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    await prisma.photo.create({

        data: {

            imageUrl,

            ownerId: user.id

        }

    });

    revalidatePath("/profile");

    return {

        success: true,

        message: "Photo uploaded."

    };

}
export async function getUserPhotos(userId: number) {

    return prisma.photo.findMany({

        where: {

            ownerId: userId

        },

        orderBy: {

            createdAt: "desc"

        }

    });

}
export async function getUserByUsername(username: string) {

    return prisma.users.findUnique({

        where: {
            username
        }

    });

}

export async function getFriends(userId: number) {

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) return [];

    return prisma.users.findMany({
        where: {
            id: {
                in: user.friends
            }
        },
        select: {
            id: true,
            username: true,
            name: true,
            profilePic: true
        },
        orderBy: {
            username: "asc"
        }
    });
}