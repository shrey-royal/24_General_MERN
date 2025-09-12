const categoryModel = require('../model/ProductCategoryModel');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newCategory = await categoryModel.create({ name });

        res.status(201).json({
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        console.error("Add Category Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        
        res.status(200).json({
            message: "Category List",
            data: categories
        });
    } catch (error) {
        console.error("Get All Categories Error: ", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    createCategory,
    getAllCategory
}