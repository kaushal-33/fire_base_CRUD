import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../config/firebase";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        // cleanup
        return () => unsubscribe();
    }, []);
    if (!user) {
        return <Login />;
    }

    // User is authenticated
    return <Component />;
};

export default ProtectedRoute;
