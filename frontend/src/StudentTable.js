import React from "react";

export default function StudentTable({ students }) {
    return (
        <table className="border-collapse border border-gray-400 w-full text-left">
            <thead>
                <tr>
                    <th className="border border-gray-400 px-2 py-1">ID</th>
                    <th className="border border-gray-400 px-2 py-1">Name</th>
                    <th className="border border-gray-400 px-2 py-1">Grade</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td className="border border-gray-400 px-2 py-1">{student.id}</td>
                        <td className="border border-gray-400 px-2 py-1">{student.name}</td>
                        <td className="border border-gray-400 px-2 py-1">{student.grade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}