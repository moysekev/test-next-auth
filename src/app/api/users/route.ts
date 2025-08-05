import { auth } from "@/auth";

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        console.log("Not authenticated", session);
        throw new Error("Not authenticated");
    }

    console.log("Session in POST api/users :", session, request);

    return Response.json({ foo: "bar" })
}