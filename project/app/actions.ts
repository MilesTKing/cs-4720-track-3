'use server'
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import {revalidatePath} from "next/cache";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


export async function sendForm(
    prevState: { success: boolean; message: string },
    formData: FormData
) {
    await prisma.orders.create({
        data: {
            wheels: Number(formData.get("wheels")),
            windshield_wipers: Number(formData.get("windshield-wipers")),
            radios: Number(formData.get("radios")),
        },
    });

    revalidatePath("/");

    return {
        success: true,
        message: "Order submitted successfully!",
    };
}

export async function getInventory() {
    return await prisma.orders.findMany();
}