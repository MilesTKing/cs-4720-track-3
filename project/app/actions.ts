'use server'

import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { revalidatePath } from "next/cache";

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function createAccount(
    prevState: {success:boolean,message:string},
    formData: FormData
){

    const username = String(formData.get("username"));

    const exists = await prisma.users.findUnique({
        where:{
            username
        }
    });

    if(exists){
        return {
            success:false,
            message:"Username already exists."
        };
    }

    await prisma.users.create({
        data:{
            username,
            password: String(formData.get("password")),
            name:String(formData.get("name")),
            bio:String(formData.get("bio")),

            twitter:String(formData.get("twitter") || ""),
            instagram:String(formData.get("instagram") || ""),
            facebook:String(formData.get("facebook") || ""),

            profilePic:"",
            photos:[],
            friends:[]
        }
    });

    revalidatePath("/");

    return {
        success:true,
        message:"Account created."
    };
}

export async function login(
    prevState:{success:boolean,message:string},
    formData:FormData
){

    const username = String(formData.get("username"));

    const users = await prisma.users.findUnique({where:{username}
    });

    if(!users){
        return {success:false, message:"users not found."
        };
    }

    return {success:true, message:"Logged in."
    };
}