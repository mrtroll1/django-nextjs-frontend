"use client" 
// Run in the front-end
// Create a url path .../login

// const LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"
const LOGIN_URL = "/api/login/"

export default function Page() {

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(event, event.target);

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
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            console.log('Logged in!');
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