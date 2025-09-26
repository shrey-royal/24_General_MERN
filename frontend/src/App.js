import React, { useState } from "react";
import StudentTable from "./StudentTable";
import AddStudentForm from "./AddStudentForm";

function App() {
    const [students, setStudents] = useState([
        { id: 1, name: "Alice", grade: 'A' },
        { id: 2, name: "Bob", grade: 'B' },
        { id: 3, name: "Charlie", grade: 'C' },
    ]);

    const [search, setSearch] = useState("");

    // Add new student (passed to form as prop)
    const addStudent = (newStudent) => {
        setStudents([ ...students, { ...newStudent, id: students.length + 1 }]);
    };

    // Filtered students
    const filteredStudentsByName = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

    // const filteredStudentsByGrade = students.filter((s) => s.grade.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Student Manager</h1>

            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 mb-4 w-full"
            />

            {/* Pass data via props */}
            <StudentTable students={filteredStudentsByName} />

            <h2 className="text-xl font-semibold mt-6 mb-2">Add Student</h2>
            <AddStudentForm onAdd={addStudent} />
        </div>
    );
}

export default App;