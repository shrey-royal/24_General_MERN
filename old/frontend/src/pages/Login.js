import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            localStorage.setItem("token", res.data.token);
            alert("Login Successful!");
        } catch (err) {
            alert(err.response?.data?.msg);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-white text-black">
            <form
                onSubmit={handleSubmit}
                className="w-96 p-8 border border-black rounded-2xl shadow-lg bg-white"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 border border-black rounded-lg focus:outline-none"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 border border-black rounded-lg focus:outline-none"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}