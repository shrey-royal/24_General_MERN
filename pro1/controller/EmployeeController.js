const employeeModel = require('../model/EmployeeModel')

const addEmployee = async (req, res) => {
    try {
        const { name,  degree, status } = req.body;

        if (!name || !status) {
            return res.status(400).json({ message: "Missing required fields (name, status)" });
        }

        const newEmployee = await employeeModel.create({ name, degree, status });

        res.status(201).json({
            message: "Employee created successfully",
            data: newEmployee
        });
    } catch (error) {
        console.error("Add Employee Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).json({
            message: "Employees list",
            data: employees
        });
    } catch (error) {
        console.error("Get All Employees Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({
            message: "Employee fetched!",
            data: employee
        });
    } catch (error) {
        console.error("Get Employee by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get employees by status
const getEmployeesByStatus = async (req, res) => {
    try {
        const status = req.params.status;

        if (!['active', 'not active', 'pending'].includes(status)) {
            return res.status(400).json({ message: "Invalid status parameter" });
        }

        const employees = await employeeModel.find({ status });

        if (employees.length === 0) {
            return res.status(404).json({ message: "No employees found with the given status" });
        }

        res.status(200).json({
            message: "Employees fetched by status!",
            data: employees
        });
    } catch (error) {
        console.error("Get Employees by Status Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update employee by ID
const updateEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        const employeeData = req.body;

        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, employeeData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found!" });
        }

        res.status(200).json({
            message: "Employee updated!",
            data: updatedEmployee
        });
    } catch (error) {
        console.error("Update Employee by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete employee by ID
const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found!" });
        }

        res.status(200).json({
            message: "Employee deleted!",
            data: deletedEmployee
        });
    } catch (error) {
        console.error("Delete Employee Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeesByStatus,
    updateEmployeeById,
    deleteEmployee
};