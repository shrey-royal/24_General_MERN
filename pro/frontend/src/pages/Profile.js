import { useEffect, useState } from "react";
import {
    getMyProfile,
    updateMyProfile,
    getAddresses,
    addAddress,
    deleteAddress,
} from "../api";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", email: "" });

    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState({
        name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phone: "",
        isDefault: false,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getMyProfile();
                setUser(data);
                setEditForm({ name: data.name, email: data.email });

                const resAddr = await getAddresses();
                setAddresses(resAddr.data);
            } catch (err) {
                console.error("Profile fetch error:", err);
            }
        }
        fetchData();
    }, []);

    // ===== Edit Profile =====
    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateMyProfile(editForm);
            setUser(data);
            setIsEditing(false);

            const saved = JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user", JSON.stringify({ ...saved, ...data }));
        } catch (err) {
            console.error("Profile update failed:", err);
        }
    };

    const handleCancelEdit = () => {
        setEditForm({ name: user.name, email: user.email });
        setIsEditing(false);
    };

    // ===== Add Address =====
    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressForm({
            ...addressForm,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addAddress(addressForm);
            setAddresses(data);
            setAddressForm({
                name: "",
                line1: "",
                line2: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
                phone: "",
                isDefault: false,
            });
            setIsAddingAddress(false);
        } catch (err) {
            console.error("Add address failed:", err);
        }
    };

    const handleCancelAddress = () => {
        setIsAddingAddress(false);
        setAddressForm({
            name: "",
            line1: "",
            line2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phone: "",
            isDefault: false,
        });
    };

    // ===== Delete Address =====
    const handleRemoveAddress = async (index) => {
        if (!window.confirm("Are you sure you want to remove this address?")) return;
        try {
            const { data } = await deleteAddress(index);
            setAddresses(data.addresses || data); // depending on backend response
        } catch (err) {
            console.error("Delete address failed:", err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            {/* ===== User Info ===== */}
            {user && (
                <div className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
                    {!isEditing ? (
                        <>
                            <p className="mb-3">
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p className="mb-4">
                                <strong>Email:</strong> {user.email}
                            </p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleEditChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-1 font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleEditChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* ===== Addresses ===== */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">My Addresses</h2>
                    {!isAddingAddress && (
                        <button
                            onClick={() => setIsAddingAddress(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Address
                        </button>
                    )}
                </div>

                {/* Address List */}
                {addresses.length > 0 ? (
                    <ul className="space-y-3">
                        {addresses.map((addr, index) => (
                            <li
                                key={addr._id || index}
                                className="p-4 border rounded-lg bg-gray-50 shadow-sm flex justify-between items-start"
                            >
                                <div>
                                    <p className="font-semibold">{addr.name}</p>
                                    <p>{addr.line1}{addr.line2 && `, ${addr.line2}`}</p>
                                    <p>
                                        {addr.city}, {addr.state} - {addr.postalCode}
                                    </p>
                                    <p>{addr.country}</p>
                                    <p className="text-sm text-gray-500">📞 {addr.phone}</p>
                                    {addr.isDefault && (
                                        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded mt-1 inline-block">
                                            Default
                                        </span>
                                    )}
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleRemoveAddress(index)}
                                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded transition-colors duration-200"
                                    title="Delete Address"
                                >
                                    <span>Delete</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No addresses saved yet.</p>
                )}

                {/* Add Address Form */}
                {isAddingAddress && (
                    <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">New Address</h3>
                        <form onSubmit={handleAddressSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={addressForm.name}
                                onChange={handleAddressChange}
                                placeholder="Full Name"
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={addressForm.phone}
                                onChange={handleAddressChange}
                                placeholder="Phone"
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="line1"
                                value={addressForm.line1}
                                onChange={handleAddressChange}
                                placeholder="Address Line 1"
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="line2"
                                value={addressForm.line2}
                                onChange={handleAddressChange}
                                placeholder="Address Line 2"
                                className="w-full px-3 py-2 border rounded"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    value={addressForm.city}
                                    onChange={handleAddressChange}
                                    placeholder="City"
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={addressForm.state}
                                    onChange={handleAddressChange}
                                    placeholder="State"
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={addressForm.postalCode}
                                    onChange={handleAddressChange}
                                    placeholder="Postal Code"
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={addressForm.country}
                                    onChange={handleAddressChange}
                                    placeholder="Country"
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={addressForm.isDefault}
                                    onChange={handleAddressChange}
                                />
                                Set as default address
                            </label>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Save Address
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelAddress}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
