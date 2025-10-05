import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// ================== Automatically add JWT in each request ==================
API.interceptors.request.use(req => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

// ================== Products ==================
export const getProducts = () => API.get('/products');

// ================== Orders ==================
// export const createOrder = (orderData) => API.post("/orders", orderData);
export const getMyOrders = () => API.get("/orders/myorders");
export const createCheckoutOrder = (orderData) => API.post("/payments/checkout", orderData);

// ================== Users ==================
export const loginUser = (formData) => API.post("/users/login", formData);
export const registerUser = (formData) => API.post("/users/register", formData);
export const getMyProfile = () => API.get("/users/profile");
export const updateMyProfile = (formData) => API.put("/users/profile", formData);

// ================== Addresses ==================
export const getAddresses = () => API.get("/addresses");
export const addAddress = (formData) => API.post("/addresses", formData);
export const updateAddress = (id, formData) => API.put(`/addresses/${id}`, formData);
export const deleteAddress = (index) => API.delete(`/addresses/${index}`);
