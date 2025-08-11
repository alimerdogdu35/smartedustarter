const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");


/**
 * @swagger
 * /enroll:
 *   post:
 *     summary: Öğrenciyi bir kursa kaydeder
 *     tags:
 *       - Enrollment
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: Kayıt olunacak kursun ID'si
 *                 example: "60f6b5a2e7e45d1234567890"
 *     responses:
 *       302:
 *         description: Kayıt başarılı, dashboard’a yönlendirme
 *       401:
 *         description: Sadece öğrenci kullanıcılar kayıt olabilir
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /unenroll:
 *   post:
 *     summary: Öğrenciyi bir kurstan kayıttan çıkarır
 *     tags:
 *       - Enrollment
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: Kayıttan çıkarılacak kursun ID'si
 *                 example: "60f6b5a2e7e45d1234567890"
 *     responses:
 *       200:
 *         description: Başarıyla kayıttan çıkarıldı ve dashboard’a yönlendirme
 *       401:
 *         description: Sadece öğrenci kullanıcılar işlem yapabilir
 *       500:
 *         description: Sunucu hatası
 */


router.post('/enroll', courseController.enrollCourse);

router.post("/unenroll", courseController.unenrollCourse);

module.exports = router;