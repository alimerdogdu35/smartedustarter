const express = require("express");
const router = express.Router();



const adminController = require("../controllers/adminController");



router.get('/', adminController.adminPage); 
router.get('/teachers', adminController.teachersPage); 
router.get('/students', adminController.studentsPage); 
router.get('/courses', adminController.coursesPage); 

module.exports = router;