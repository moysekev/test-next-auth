'use server';

import { auth } from "@/auth";


export async function aServerAction(formData: FormData) {
    const session = await auth();
    if (!session) {
        console.log("Not authenticated", session);
        throw new Error("Not authenticated");
    }

    console.log("Session in aServerAction:", session);

    const rawFormData = {
        aKey: formData.get('aKey')
    };
    console.log("aServerAction called with", rawFormData);
}