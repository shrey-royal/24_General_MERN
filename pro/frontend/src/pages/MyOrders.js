import { useEffect, useState } from "react";
import { getMyOrders } from "../api";
import { Link } from "react-router-dom";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true);
                const { data } = await getMyOrders();
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600">
                Loading your orders...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center bg-white shadow-md rounded-xl p-10">
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                    <Link
                        to="/"
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row justify-between mb-4 border-b pb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID:</p>
                                    <p className="font-mono text-gray-800">{order._id}</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Placed on:{" "}
                                    <span className="font-semibold text-gray-800">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3 mb-4">
                                {order.orderItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border-b pb-3 last:border-none"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.qty} × ${item.price}
                                            </p>
                                        </div>
                                        <p className="font-semibold">${item.price * item.qty}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4">
                                <p className="text-gray-600">
                                    <span className="font-semibold">Payment Status:</span>{" "}
                                    {order.isPaid ? (
                                        <span className="text-green-600 font-medium">Paid</span>
                                    ) : (
                                        <span className="text-red-600 font-medium">Pending</span>
                                    )}
                                </p>

                                <p className="text-gray-600">
                                    <span className="font-semibold">Order Status:</span>{" "}
                                    {order.isDelivered ? (
                                        <span className="text-green-600 font-medium">Delivered</span>
                                    ) : (
                                        <span className="text-yellow-600 font-medium">Processing</span>
                                    )}
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    Total: ${order.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
