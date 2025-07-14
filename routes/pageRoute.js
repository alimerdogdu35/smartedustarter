const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");
router.get("/", pageController.index);
router.get("/login", pageController.loginGet);
router.get("/register", pageController.registerGet);
router.get("/dashboard", pageController.dashboardPage);
router.get("/courses", pageController.coursesPage);
router.get("/course/:id", pageController.subCoursesPage);

module.exports = router;