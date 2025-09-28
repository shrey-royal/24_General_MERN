const productModel = require('../model/ProductModel')

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, category, status } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newProduct = await productModel.create({ name, price, category, status });

        res.status(201).json({
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({ status: true }).populate('category');

        res.status(200).json({
            message: "Products list",
            data: products
        });
    } catch (error) {
        console.error("Get All Products Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).populate('category');

        if (!product) {
            return res.status(404).json({ message: "No product found" });
        }

        res.status(200).json({
            message: "Product fetched!",
            data: product
        });
    } catch (error) {
        console.error("Get Product by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update product by ID
const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;

        const updatedProduct = await productModel.findByIdAndUpdate(id, productData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({
            message: "Product updated!",
            data: updatedProduct
        });
    } catch (error) {
        console.error("Update Product by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({
            message: "Product deleted!",
            data: deletedProduct
        });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProduct
};