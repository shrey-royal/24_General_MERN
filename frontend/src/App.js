import React from "react";
import LoginForm from "./LoginForm";

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}

export default App;