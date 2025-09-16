const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const zodMiddleware = require('../middleware/ZodMiddleware');
const userValidationSchema = require('../util/UserValidationSchema');
const token = require('../util/token');

router.get("/", token.verifyToken, userController.getAllUsers);
router.get("/id/:id", userController.getUserById);
router.get("/age/:age", userController.getUserByAge);
router.get("/age-range", userController.getUserByAgeRange);
router.post("/", zodMiddleware.validationSchema(userValidationSchema), userController.addUser);
router.put("/id/:id", userController.updateUserById);
router.put("/email/:email", userController.updateUserByEmail);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;