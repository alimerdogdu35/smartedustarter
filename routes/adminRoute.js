const express = require("express");
const router = express.Router();



const adminController = require("../controllers/adminController");

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Yönetici panelinin ana sayfası
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Yönetici paneli sayfası HTML olarak döner
 *       401:
 *         description: Yetkisiz erişim
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /admin/courses:
 *   get:
 *     summary: Tüm kursların listesi (ana ve alt kurslar)
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Kurslar sayfası HTML olarak döner
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /admin/students:
 *   get:
 *     summary: Öğrenci listesini döner
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Öğrenciler sayfası HTML olarak döner
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /admin/teachers:
 *   get:
 *     summary: Öğretmen listesini döner
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Öğretmenler sayfası HTML olarak döner
 *       500:
 *         description: Sunucu hatası
 */

router.get('/', adminController.adminPage); 
router.get('/teachers', adminController.teachersPage); 
router.get('/students', adminController.studentsPage); 
router.get('/courses', adminController.coursesPage); 

module.exports = router;