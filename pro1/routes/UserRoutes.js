const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const zodMiddleware = require('../middleware/ZodMiddleware');
const userValidationSchema = require('../util/UserValidationSchema');

router.get("/", userController.getAllUsers);
router.get("/id/:id", userController.getUserById);
router.get("/age/:age", userController.getUserByAge);
router.get("/age-range", userController.getUserByAgeRange);
// router.post("/", userController.addUser);
router.post("/", zodMiddleware.validationSchema(userValidationSchema), userController.addUser);
router.put("/id/:id", userController.updateUserById);
router.put("/email/:email", userController.updateUserByEmail);
router.delete("/:id", userController.deleteUser);

module.exports = router;