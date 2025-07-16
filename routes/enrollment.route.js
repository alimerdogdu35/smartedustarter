const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");

router.post('/enroll', courseController.enrollCourse);

router.post("/unenroll", courseController.unenrollCourse);

module.exports = router;