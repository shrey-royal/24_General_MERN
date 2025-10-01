import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/products");
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                🛍️ Our Products
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {product.name}
                            </h2>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xl font-bold text-indigo-600">
                                    &#x20b9;{product.price}
                                </span>
                                <button className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
