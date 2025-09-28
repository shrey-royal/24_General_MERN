import { useState } from "react";

function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User login data: ", formData);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 mb-2 block"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 mb-2 block"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;