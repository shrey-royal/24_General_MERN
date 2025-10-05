import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
// import { createOrder } from "../api";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.quantity + delta, item.countInStock)) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item._id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 99;
  const total = subtotal + shipping;

  // const handleSubmit = async () => {
  //   try {

  //     const orderData = {
  //       orderItems: cartItems.map(item => ({
  //         product: item._id,
  //         qty: item.quantity,
  //       })),
  //       shippingAddress: {
  //         name: "John Doe",
  //         line1: "123 Main Street",
  //         city: "New York",
  //         postalCode: "10001",
  //         country: "USA",
  //         phone: "+1 555 883667",
  //       },
  //       paymentMethod: "COD",
  //     };
  //     console.log("in try", orderData);

  //     const { data } = await createOrder(orderData);

  //     alert("Order placed successfully!");
  //     console.log("Order Placed: ", data);

  //     setCartItems([]);
  //   } catch (error) {
  //     console.error("Order error: ", error.response?.data || error.message);
  //     alert(error.response?.data?.message || "Failed to place order");
  //   }
  // };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in before proceeding to checkout.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout"); // go to the checkout page
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-indigo-600 font-bold mt-1">${item.price}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border rounded-lg">
                        <button onClick={() => updateQuantity(item._id, -1)} className="p-2 hover:bg-gray-100">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="p-2 hover:bg-gray-100">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
