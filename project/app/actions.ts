'use server'
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function sendForm(formData: FormData) {
    return await prisma.orders.create({
        data: {
            wheels: +formData.get("wheels"),
            windshield_wipers: +formData.get("windshield-wipers"),
            radios: +formData.get("radios"),
        },
    });
}
export async function getInventory() {
    return await prisma.orders.findMany();
}