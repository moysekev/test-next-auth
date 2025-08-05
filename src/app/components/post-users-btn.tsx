"use client"
export default function PostUsersButton() {
    return (
        <form
            action={async () => {
                // make a POST request to the /api/users endpoint
                
                await fetch("/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ action: "whatever" })
                });
            }}
        >
            <button type="submit">Post to /api/users</button>
        </form>
    )
} 