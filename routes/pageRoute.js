const express = require("express");
const router = express.Router();
const {courseCounter} = require("../middlewares/courseMiddleware");

const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");
router.get("/course/:id",courseCounter, pageController.subCoursesPage);
router.get("/", pageController.index);
router.get("/login", pageController.loginGet);
router.get("/register", pageController.registerGet);


router.get('/dashboard', pageController.dashboardGet);
// routes/page.route.js
router.get('/dashboard-teacher', pageController.teacherDashboard); // tüm kurslar
router.get('/dashboard-teacher/:courseId', pageController.teacherDashboard); // belirli kurs

router.get("/courses", pageController.coursesPage);
router.get("/contact", pageController.contactPage);


module.exports = router;