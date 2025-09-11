const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.get("/", userController.getAllUsers);
router.get("/id/:id", userController.getUserById);
router.post("/", userController.addUser);
router.put("/id/:id", userController.updateUserById);
router.put("/email/:email", userController.updateUserByEmail);
router.delete("/:id", userController.deleteUser);

module.exports = router;
