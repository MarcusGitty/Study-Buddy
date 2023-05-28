import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter, useSegments } from "expo-router"

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRouter(user) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        console.log(`useProtectedRoute useEffect Called`);
        const inAuthGroup = segments[0] === "(auth)";
        if (user == null && !inAuthGroup) {
            router.replace("/Sign-In");
        } else if (user && inAuthGroup) {
            router.replace('/');
        }
    }, [router, segments, user])
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    useProtectedRouter(user);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(`authStateEvent: ${event}`);
            if (event === "SIGNED_IN") {
                setUser(session.user);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
            }
            
        })
        return () => data.subscription.unsubscribe();
    }, [])
    return <AuthContext.Provider value={{ user }}>{ children }</AuthContext.Provider>
}