"use client" 
import { useAuth } from "@/components/authProvider";
// Run in the front-end
// Create a url path .../login

// const LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"
const LOGIN_URL = "/api/login/";

const LOCAL_STORAGE_KEY = 'is-logged-in';

export default function Page() {
    console.log('Opened login page')

    const auth = useAuth();

    // const authStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if (authStatus) {
    //     const authStatusInt = parseInt(authStatus);
    //     if (authStatusInt === 1) {
    //         auth.login();
    //     }
    // }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log('handleSubmit on the login page')
        
        const formData = new FormData(event.target);
        const objectFromForm = Object.fromEntries(formData);
        const jsonData = JSON.stringify(objectFromForm); // data to send with our post request
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: jsonData
        }

        const response = await fetch(LOGIN_URL, requestOptions);
        let data = {}
        try {
          data = await response.json()
        } catch (error) {
          console.log(error);
        }
        console.log(data);
        if (response.ok) {
            console.log('Logged in!');
            auth.login();
        }
    }

    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Login here</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" required name="username" placeholder="Your username"></input>
                <input type="password" required name="password" placeholder="Your password"></input>
                <button type="submit">Login</button>
            </form>
        </div>
}