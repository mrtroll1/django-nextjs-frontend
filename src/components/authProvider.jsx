"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { useContext, createContext, useState, useEffect } = require("react");

const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login"; 
const LOGIN_REQUIRED_URL = "/login";

const LOCAL_STORAGE_KEY = 'is-logged-in';

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const currentPath = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const authStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (authStatus) {
            const authStatusInt = parseInt(authStatus);
            setIsAuthenticated(authStatusInt===1);
        }
    }, [])

    const login = () => {
        console.log('Called login function');
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, '1');
        const nextUrl = searchParams.get("next");
        const invalidNextUrl = ['/login', '/logout'];
        const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);
        console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
        console.log(`Redirecting to ${nextUrl} if ${nextUrlValid}`);
        if (nextUrlValid) {
            console.log('Success!');
            router.replace(nextUrl);
        } else {
            router.replace(LOGIN_REDIRECT_URL);
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, '0');
        router.replace(LOGOUT_REDIRECT_URL);
    }

    const loginRequiredRedirect = () => {
        console.log('Called loginRedirect function');
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, '0');
        const loginNextURL = `${LOGIN_REQUIRED_URL}?next=${currentPath}`;
        if (LOGIN_REQUIRED_URL === currentPath) {
            loginNextURL = `${LOGIN_REQUIRED_URL}`;
        }
        router.replace(loginNextURL);
    }

    return <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequiredRedirect}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}