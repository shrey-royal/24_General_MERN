const express = require('express');
const router = express.Router();
const employeeController = require('../controller/EmployeeController');

router.get("/", employeeController.getAllEmployees);
router.get("/id/:id", employeeController.getEmployeeById);
router.get("/status/:status", employeeController.getEmployeesByStatus);
router.post("/", employeeController.addEmployee);
router.put("/id/:id", employeeController.updateEmployeeById);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;