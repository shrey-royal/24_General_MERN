import Cart from "./Cart";
import Product from "./Product";

function App() {
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 600 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">🛍️ Shop</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
      <Cart />
    </div>
  );
}


export default App;
