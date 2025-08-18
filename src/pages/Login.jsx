import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { app } from "../config/firebase";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const auth = getAuth(app);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                inputs.email,
                inputs.password
            );
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    value={inputs.email}
                    onChange={handleChange}
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={inputs.password}
                    onChange={handleChange}
                />
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
