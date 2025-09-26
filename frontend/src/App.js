import React from "react";
import SearchBar from "./SearchBar";

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    🛒 Product Search
                </h1>
                <SearchBar />
            </div>
        </div>
    );
}

export default App;