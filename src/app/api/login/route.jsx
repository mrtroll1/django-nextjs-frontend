"use server"
import { setRefreshToken, setToken } from "../../../../lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"

export async function POST(request) {
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
        const authToken = responseData.access;
        const authRefreshToken = responseData.refresh;
        await setToken(authToken);
        await setRefreshToken(authRefreshToken);
        console.log('Logged in!');
        return NextResponse.json({"loggedIn": true, "cookie": authToken}, {status: 200})
    }

    // const authToken = cookies().get('auth-token')
    
    return NextResponse.json({"loggedIn": false, ...responseData}, {status: 400})
}