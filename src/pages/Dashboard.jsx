import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import Header from "../components/Header"

const Dashboard = () => {

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="">
            <Header />
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Dashboard