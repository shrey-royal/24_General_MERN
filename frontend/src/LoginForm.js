import { useRef } from "react";

function LoginForm() {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();   // directly focuses the input
    }

    return (
        <div className="p-4">
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter username"
                className="border p-2 rounded"
            />
            <button
                onClick={focusInput}
                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
                Focus Input
            </button>
        </div>
    );
}

export default LoginForm;