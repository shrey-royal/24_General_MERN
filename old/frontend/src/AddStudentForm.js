import React, { useState } from "react";

export default function AddStudentForm({ onAdd }) {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !grade) return;

        onAdd({ name, grade }); // send new student to parent
        setName("");
        setGrade("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 flex-1"
            />
            <input
                type="text"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="border p-2 w-20"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 rounded-lg"
            >
                Add
            </button>
        </form>
    );
}