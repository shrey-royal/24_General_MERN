import { Link, useParams } from "react-router-dom";

export default function OrderSuccess() {
    const { id } = useParams();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">
                <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Successful!</h1>
                <p className="text-gray-700 mb-4">
                    Your order <strong>#{id}</strong> has been placed successfully.
                </p>
                <Link
                    to="/orders"
                    className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                >
                    View My Orders
                </Link>
            </div>
        </div>
    );
}
