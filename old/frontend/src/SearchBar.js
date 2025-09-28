import { useState } from "react";


function SearchBar() {
    const [query, setQuery] = useState("");
    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                placeholder="Search for products..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <p className="mt-2 text-gray-600">
                Showing results for: <strong>{query}</strong>
            </p>
        </div>
    );
}

export default SearchBar;