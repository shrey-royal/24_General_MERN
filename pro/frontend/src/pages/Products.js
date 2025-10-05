import { useEffect, useState } from "react";
import { getProducts } from "../api";

export default function Products({ addToCart, searchQuery }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
    || p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Products</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
              <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
