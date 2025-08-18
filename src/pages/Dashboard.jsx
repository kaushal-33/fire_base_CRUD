import { getAuth, signOut } from "firebase/auth"
import { app } from "../config/firebase"

const Dashboard = () => {

    const auth = getAuth(app)
    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {

        }
    }
    return (
        <div>Dashboard
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Dashboard