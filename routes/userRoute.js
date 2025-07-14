const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");
const userController = require("../controllers/userController.");
router.get("/logout", userController.logout);

router.post("/register", userController.registerPost);
router.post("/login", userController.loginPost);


module.exports = router;