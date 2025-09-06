import { useContext, useState } from "react";
import { AuthStore } from "../context/AuthContext";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Header = () => {
    const { user } = useContext(AuthStore);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully", { position: "top-left" });
        } catch {
            toast.error("Error logging out!", { position: "top-right" });
        }
    };

    return (
        <header className="w-full bg-white/80 backdrop-blur-md shadow sticky top-0 z-50 border-b border-[#A77C48]/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center py-3">
                    {/* Logo */}
                    <div>
                        <img src="/images/logo.png" alt="Logo" className="w-16" />
                    </div>

                    {/* Desktop User Info */}
                    {user && (
                        <div className="hidden md:flex items-center gap-4">
                            <div className="text-right">
                                <div className="font-semibold text-[#37474F]">{user.displayName || "Anonymous"}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                            <img
                                src={user.photoURL || "/images/user.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                                onError={(e) => { e.currentTarget.src = "/images/user.png"; }}
                            />
                            <button
                                onClick={handleLogout}
                                className="bg-[#C62828] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            {menuOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-[#A77C48]/20 shadow">
                    <div className="px-6 py-4 space-y-3">
                        <button className="w-full bg-[#1976D2] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#43A047] transition">
                            ➕ Add TV
                        </button>

                        {user ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.photoURL || "/images/user.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                                    />
                                    <div>
                                        <div className="font-semibold text-[#37474F]">{user.displayName || "User"}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-[#C62828] text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button className="w-full text-[#1976D2] font-semibold hover:underline">
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
