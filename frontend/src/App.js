import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
    return <h2>🏠 Welcome to our Store</h2>;
}

function Products() {
    return <h2>🛒 Browse Products</h2>;
}

function Cart() {
    return <h2>🛍 Your Cart</h2>;
}

function App() {
    return (
        <Router>
            <nav className="p-4 bg-gray-200 flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
            </nav>

            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;