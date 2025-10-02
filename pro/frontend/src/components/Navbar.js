import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar({ cartCount, onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
    }

    onSearch(query);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">MyShop</Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="hidden md:flex items-center w-1/2 mx-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700">
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Links & Cart */}
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Products</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
