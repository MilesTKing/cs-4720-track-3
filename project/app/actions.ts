'use server'

import {PrismaClient} from "@/prisma/generated/prisma/client";
import {PrismaNeon} from "@prisma/adapter-neon";
import {revalidatePath} from "next/cache";
import {cookies} from 'next/headers';

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

    await prisma.users.create({
        data: {
            username,
            password: String(formData.get("password")),
            name: String(formData.get("name")),
            bio: String(formData.get("bio")),

            twitter: String(formData.get("twitter") || ""),
            instagram: String(formData.get("instagram") || ""),
            facebook: String(formData.get("facebook") || ""),

            profilePic: "",
            photos: [],
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