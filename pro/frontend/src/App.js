import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setAuthUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthUser(userData);
  };

  const handleSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthUser(null);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.countInStock) }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <Navbar
        cartCount={cartItems.length}
        onSearch={setSearchQuery}
        authUser={authUser}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} searchQuery={searchQuery} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
