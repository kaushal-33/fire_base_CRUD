import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";

const SignUp = ({ signUpWithGoogle, goToLogin }) => {
    const [inputs, setInputs] = useState({
        upEmail: "",
        upPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        });
    };

    const handleUpSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(inputs).some(val => val.trim() === '')) {
            toast.error("Fill all the Inputs...!", { position: 'top-right' });
            return;
        }
        if (inputs.upPassword !== inputs.confirmPassword) {
            toast.error("Password doesn't match...!", { position: 'top-right' });
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                inputs.upEmail,
                inputs.upPassword
            );
            toast.success("Account created successfully!", { position: 'top-left' });
        } catch (error) {
            if (error.code === 'auth/weak-password') toast.error("Password should be atleast 6 character...!", { position: 'top-right' })
            else if (error.code === 'auth/email-already-in-use') toast.error("Email already in use...!", { position: 'top-right' })
            else toast.error("Internal error...!", { position: 'top-right' });
        }
    };
    return (
        <div>
            <h2 className="text-white capitalize font-serif text-5xl mb-9">
                Sign Up
            </h2>

            <form onSubmit={handleUpSubmit} className="space-y-6">
                {/* Email */}
                <input
                    type="email"
                    name="email"
                    id="upEmail"
                    placeholder="📧 Enter your email"
                    value={inputs.upEmail}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-400 focus:border-indigo-600 
                     focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-500 
                     transition duration-300 ease-in-out"
                    autoComplete="email"
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    id="upPassword"
                    placeholder="🔒 Create a password"
                    value={inputs.upPassword}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-400 focus:border-indigo-600 
                     focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-500 
                     transition duration-300 ease-in-out"
                    autoComplete="new-password"
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="✅ Confirm password"
                    value={inputs.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-400 focus:border-indigo-600 
                     focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-500 
                     transition duration-300 ease-in-out"
                    autoComplete="new-password"
                />
                <button
                    type="submit"
                    className="py-3 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white 
                     font-semibold text-lg shadow-lg transition-colors duration-300 ease-in-out"
                >
                    Sign Up
                </button>

                {/* Google sign up */}
                <button
                    type="button"
                    onClick={signUpWithGoogle}
                    className="flex w-full items-center justify-center gap-3 py-3 rounded-xl border border-gray-400 
                     bg-white hover:bg-gray-100 text-gray-900 font-semibold shadow-md transition-colors 
                     duration-300 ease-in-out"
                >
                    <img src="images/google-icon.png" alt="google icon" className="w-6 h-6" />
                    <span>Sign Up with Google</span>
                </button>
            </form>
            <p className="mt-6 text-center text-gray-300 tracking-wide">
                Already have an account?{" "}
                <button className="text-indigo-400 font-semibold" onClick={goToLogin}>
                    Login here
                </button>
            </p>
        </div>
    );
};

export default SignUp;
