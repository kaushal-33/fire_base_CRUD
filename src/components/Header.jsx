import { useContext, useState } from "react";
import { AuthStore } from "../context/AuthContext";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import Login from "../pages/Login";

const Header = () => {
    const { user } = useContext(AuthStore);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully", { position: "top-left" });
        } catch (error) {
            toast.error("Error logging out!", { position: "top-right" });
        }
    };


    return (
        <header className="w-full bg-white shadow-md sticky top-0">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="">
                        <img src="/images/logo.png" alt="Logo" width={70} />
                    </div>
                    <div className="hidden md:flex">
                        {user && (
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col text-right">
                                    <span className="text-gray-800 font-medium text-sm">
                                        {user.displayName || "Anonymous"}
                                    </span>
                                    <span className="text-gray-500 text-xs">{user.email}</span>
                                </div>
                                <img
                                    src={user.photoURL || "/images/user.png"}
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/user.png"
                                    }}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                />
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-3 py-2 font-semibold rounded-md text-sm hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                        >
                            {
                                menuOpen ? "×" : "="
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md border-t border-gray-200">
                    <div className="px-4 py-3 flex flex-col gap-3">
                        <button className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
                            ➕ Add TV
                        </button>

                        {user ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.photoURL || "/images/default-avatar.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                    />
                                    <div>
                                        <div className="text-gray-800 font-medium">{user.displayName || "User"}</div>
                                        <div className="text-gray-500 text-sm">{user.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button className="text-blue-600 font-semibold hover:underline text-left">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
