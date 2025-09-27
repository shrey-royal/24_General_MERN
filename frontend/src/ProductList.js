import { useEffect, useState } from "react";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    });

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id} className="border-b py-4 flex items-center space-x-4">
                        <img
                            src={p.image}
                            alt={p.title}
                            className="w-16 h-16 object-contain"
                        />
                        <div>
                            <div className="font-medium">{p.title}</div>
                            <div className="text-gray-600">${p.price}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;