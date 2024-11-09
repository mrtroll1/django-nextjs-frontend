"use server"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"

export async function POST(request) {
    const myAuthToken = (await cookies()).get('auth-token')
    console.log(myAuthToken);

    const requestData = await request.json();
    const jsonData = JSON.stringify(requestData); // data to send with our post request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: jsonData
    }

    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();
    if (response.ok) {
        console.log('Logged in!');
    }

    // const authToken = cookies().get('auth-token')
    const authToken = responseData.access;
    (await cookies()).set({
        name: 'auth-token',
        value: authToken,
        httpOnly: true, // limit client-side JS
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600
    })
    return NextResponse.json({"hello": "world", "cookie": authToken}, {status: 200})
}