import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar({ cartCount, onSearch, authUser, onLogout }) {
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
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">MyShop</Link>

        {/* Search Bar - Minimal Design */}
        <form onSubmit={handleSubmit} className="hidden md:flex items-center w-1/2 mx-6">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
          </div>
        </form>

        {/* Links & Cart */}
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">Products</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">About</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {authUser ? (
            <>
              <Link to="/profile" className="text-gray-700 font-medium hover:text-indigo-600">
                Hi, {authUser.name}
              </Link>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}