const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");

/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Yeni kurs oluşturur (öğretmenler için)
 *     tags:
 *       - Course
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type:object
 *              
 *             
 *             properties:
 *                type:Number
 *                
 *               name:
 *                 type: string
 *                 description: Kurs ismi
 *                 example: "Matematik 101"
 *               description:
 *                 type: string
 *                 description: Kurs açıklaması
 *                 example: "Başlangıç seviyesi matematik kursu"
 *               parent:
 *                 type: string
 *                 description: Ana kurs ID (opsiyonel)
 *                 example: "60f6b5a2e7e45d1234567890"
 *                
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Kurs için görsel dosyası (opsiyonel)
 *     responses:
 *       302:
 *         description: Başarılı işlem sonrası yönlendirme (redirect)
 *       401:
 *         description: Yetkisiz kullanıcı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /course/enroll:
 *   post:
 *     summary: Öğrenciyi kursa kaydeder
 *     tags:
 *       - Course
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
 *                 description: Kaydolunacak kursun ID'si
 *                 example: "60f6b5a2e7e45d1234567890"
 *     responses:
 *       302:
 *         description: Başarılı kayıt sonrası yönlendirme (redirect)
 *       401:
 *         description: Sadece öğrenciler kayıt olabilir
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /course/unenroll:
 *   post:
 *     summary: Öğrenciyi kurstan kayıttan çıkarır
 *     tags:
 *       - Course
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
 *         description: Kayıttan çıkarma işlemi başarılı
 *       401:
 *         description: Sadece öğrenciler işlem yapabilir
 *       500:
 *         description: Sunucu hatası
 */



router.post("/create", courseController.createCourse)


router.post("/enroll", courseController.enrollCourse)



module.exports = router;