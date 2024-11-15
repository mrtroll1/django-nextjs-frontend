"use client" 
import { useAuth } from "@/components/authProvider";

const LOGOUT_URL = "/api/logout/"

export default function Page() {
    const auth = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: ""
        }

        const response = await fetch(LOGOUT_URL, requestOptions);
        if (response.ok) {
            console.log('Logged out!');
            auth.logout();
        }
    }

    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Are you sure you want to logout?</h1>
            <button className="bg-blue-500 text-white hover:bg-red-300  px-3 py-2" type="submit" onClick={handleSubmit}>Yes, logout</button>
        </div>
}