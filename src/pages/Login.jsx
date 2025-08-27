import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import SignUp from "../components/SignUp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";
import { AuthStore } from "../context/AuthContext";


const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { loading } = useContext(AuthStore);
    const swiperRef = useRef(null);
    const provider = new GoogleAuthProvider()
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.email.trim() || !inputs.password.trim()) {
            toast.error("Fill all the Inputs...!", { position: 'top-right' });
            return;
        }
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                inputs.email,
                inputs.password
            );
            toast.success("Logged in successfully...", { position: 'top-left' })
        } catch (error) {

            if (error.code === 'auth/invalid-credential') toast.error("Invalid credential...!", { position: 'top-right' })
            else toast.error("Internal error...!", { position: 'top-right' });
        }
    };

    const signInWithGoogle = async () => {
        try {
            let result = await signInWithPopup(auth, provider)
            toast.success("Logged in successfully...", { position: 'top-left' })
        } catch (error) {
            console.log(error)
        }
    }

    const goToSignUp = () => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(1);
        }
    };
    const goToLogin = () => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0);
        }
    };
    if (loading) {
        return (
            <section className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#1a233a] via-[#263150] to-[#375173]">
                <div className="text-white font-mono font-semibold text-4xl">🔃Fetching data...</div>
            </section>
        );
    }

    return (
        <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#1a233a] via-[#263150] to-[#375173] px-4 sm:px-6">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <span className="absolute -top-20 -left-20 w-72 h-72 bg-[#537AA6] rounded-full opacity-30 mix-blend-screen"></span>
                <span className="absolute bottom-10 right-10 w-96 h-96 bg-[#1E2A47] rounded-full opacity-40 mix-blend-lighten"></span>
                <span className="absolute top-1/2 left-1/3 w-56 h-56 bg-[#445D85] rounded-full opacity-20 mix-blend-screen"></span>
            </div>
            <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl flex flex-wrap">
                {/* Left side */}
                <div className="w-full lg:w-7/12 bg-[#f8f0eb] px-6 sm:px-8 py-10 flex flex-col justify-center h-full items-center text-center lg:text-left">
                    <img
                        src="/images/welcome-img.png"
                        alt="welcome illustration"
                        className="w-full max-w-sm lg:max-w-md"
                    />
                    <p className="mt-6 font-medium text-[#1E2A47]">
                        Sign in to continue to your dashboard and manage your T.Vs with ease.
                    </p>
                </div>
                {/* Right side */}
                <div className="w-full lg:w-5/12 h-full bg-gradient-to-bl from-[#1a233a] to-[#263150]">
                    <Swiper className="mySwiper h-full"
                        freeMode={true}
                        speed={1000}
                        modules={[Navigation]}
                        onSwiper={(swiper) => { swiperRef.current = swiper; }}
                        allowTouchMove={false}
                        navigation={false}
                    >
                        <SwiperSlide className="px-6 sm:px-8 py-10 h-full">
                            <h2 className="text-white capitalize font-serif text-6xl mb-9">login</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="📧 Enter your email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-400 focus:border-indigo-600 
                                        focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-500 transition duration-300 ease-in-out"
                                    autoComplete="email"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="🔒 Enter your password"
                                    value={inputs.password}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-400 focus:border-indigo-600
                                        focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-500 transition duration-300 ease-in-out"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="submit"
                                    className="py-3 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-lg transition-colors duration-300 ease-in-out"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={signInWithGoogle}
                                    className="flex w-full items-center justify-center gap-3 py-3 rounded-xl 
                                        border border-gray-400 bg-white hover:bg-gray-100 text-gray-900 font-semibold shadow-md transition-colors duration-300 ease-in-out"
                                >
                                    <img src="images/google-icon.png" alt="google icon" className="w-6 h-6" />
                                    <span>Continue with Google</span>
                                </button>
                            </form>

                            <p className="mt-9 text-center text-gray-300 tracking-wide">
                                Don’t have an account?{" "}
                                <button className="text-indigo-400 font-semibold" onClick={goToSignUp}>
                                    Sign up here
                                </button>
                            </p>
                        </SwiperSlide>
                        <SwiperSlide className="px-6 sm:px-8 py-10 h-full">
                            <SignUp signUpWithGoogle={signInWithGoogle} goToLogin={goToLogin} />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Login;
