import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createCheckoutOrder, getAddresses } from "../api";
import PaymentForm from "../components/PaymentForm";

export default function Checkout({ cartItems, setCartItems }) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [cardInfo, setCardInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadAddresses() {
            try {
                const { data } = await getAddresses();
                setAddresses(data);
                if (data.length > 0) setSelectedAddress(data.find((a) => a.isDefault) || data[0]);
            } catch (err) {
                console.error("Failed to load addresses:", err);
            }
        }
        loadAddresses();
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 2000 ? 0 : 99;
    const tax = +(subtotal * 0.1).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);

    const handlePlaceOrder = async () => {
        console.log("processing your order...");
        
        if (!selectedAddress) {
            alert("Please select a shipping address.");
            return;
        }

        const orderData = {
            orderItems: cartItems.map((i) => ({
                product: i._id,
                name: i.name,
                image: i.image,
                price: i.price,
                qty: i.quantity,
            })),
            shippingAddress: selectedAddress,
            paymentMethod,
            cardInfo: paymentMethod === "card" ? cardInfo : null,
        };

        setLoading(true);
        try {
            
            const response = await createCheckoutOrder(orderData);
            console.log(response.data);

            // ✅ make sure we’re getting the order object
            const order = response?.data;

            if (order && order._id) {
                console.log("✅ Order created successfully:", order);
                setCartItems([]);
                toast.success("Order placed successfully!");
                navigate(`/order-success/${order._id}`);
            } else {
                console.error("Unexpected response:", response);
                alert("Order created but invalid response. Check backend JSON.");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert(err.response?.data?.message || "Payment or order failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left - Address & Payment */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                            {addresses.length === 0 ? (
                                <p className="text-gray-500">No addresses found. Please add one in your Profile.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {addresses.map((addr) => (
                                        <li
                                            key={addr._id}
                                            onClick={() => setSelectedAddress(addr)}
                                            className={`p-4 border rounded-lg cursor-pointer transition ${selectedAddress?._id === addr._id
                                                ? "border-indigo-500 bg-indigo-50"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            <p className="font-semibold">{addr.name}</p>
                                            <p>{addr.line1}</p>
                                            <p>
                                                {addr.city}, {addr.state} - {addr.postalCode}
                                            </p>
                                            <p>{addr.country}</p>
                                            <p className="text-sm text-gray-500">📞 {addr.phone}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    Cash on Delivery (COD)
                                </label>

                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    Credit / Debit Card (Authorize.Net)
                                </label>
                            </div>

                            {paymentMethod === "card" && (
                                <div className="mt-6">
                                    <PaymentForm cardInfo={cardInfo} setCardInfo={setCardInfo} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right - Summary */}
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 h-fit">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (10%)</span>
                                <span>${tax}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        <button
                            disabled={loading || cartItems.length === 0}
                            onClick={handlePlaceOrder}
                            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                            {loading ? "Processing..." : "Place Order"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
