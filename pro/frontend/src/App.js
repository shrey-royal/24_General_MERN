import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<h1 className="p-6">About Page</h1>} />
        <Route path="/cart" element={<h1 className="p-6">Cart Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
