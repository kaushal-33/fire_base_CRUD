import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { app } from "../config/firebase";

export const AuthStore = createContext(null);

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    return (
        <AuthStore.Provider value={{ user, setUser }}>
            {children}
        </AuthStore.Provider>
    )
}

export default AuthContext