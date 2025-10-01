import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          MyShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition">
            Products
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition">
            About
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart (2)</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
