import { useContext } from "react";
import Login from "../pages/Login";
import { AuthStore } from "../context/AuthContext";

const ProtectedRoute = ({ Component }) => {
    const { user } = useContext(AuthStore);
    if (!user) {
        return <Login />;
    }

    // User is authenticated
    return <Component />;
};

export default ProtectedRoute;
