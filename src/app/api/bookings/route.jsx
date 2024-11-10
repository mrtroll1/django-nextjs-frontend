"user server"

import { NextResponse } from 'next/server';
import { getToken } from '../../../lib/auth';

const DJANGO_BOOKINGS_URL = "http://127.0.0.1:8000/api/bookings/";

export async function GET(request) {
    const authToken = await getToken();
    if (!authToken) {
        return NextResponse.json({}, {status: 401 });
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "applications/json",
            "Accept": "applications/json", // accept nothing else
            "Authorization": `Bearer ${authToken}`,
        }
    }

    const response = await fetch(DJANGO_BOOKINGS_URL, options);
    const data = await response.json();
    if (!response.ok) {
        return NextResponse.json({status: 401}, ...data);
    }

    return NextResponse.json({"data": data}, {status: 200});
}