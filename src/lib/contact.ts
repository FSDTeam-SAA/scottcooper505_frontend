
export async function createContact( payload: { name: string; email: string; address: string; phoneNumber: string; subject: string; message: string; }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed send message");
    return resData;
}
