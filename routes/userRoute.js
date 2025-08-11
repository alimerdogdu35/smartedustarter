const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");
const userController = require("../controllers/userController.");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Yeni kullanıcı kaydı yapar ve doğrulama maili gönderir
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alim Can"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "alimcan@example.com"
 *               password:
 *                 type: string
 *                 example: "sifre123"
 *     responses:
 *       302:
 *         description: Başarılı kayıt sonrası login sayfasına yönlendirme
 *       400:
 *         description: Doğrulama hatası (eksik veya hatalı veri)
 *       409:
 *         description: Bu email zaten kayıtlı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Kullanıcı giriş yapar, başarılıysa kullanıcı tipine göre yönlendirilir
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "alimcan@example.com"
 *               password:
 *                 type: string
 *                 example: "sifre123"
 *     responses:
 *       200:
 *         description: Başarılı giriş ve yönlendirme
 *       401:
 *         description: Doğrulanmamış kullanıcı veya yetkisiz erişim
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /users/{id}/verify/{token}:
 *   get:
 *     summary: Kullanıcının email adresini doğrular
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kullanıcı ID'si
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         description: Doğrulama tokeni
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email başarıyla doğrulandı
 *       400:
 *         description: Geçersiz link veya token
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Kullanıcı oturumunu sonlandırır ve ana sayfaya yönlendirir
 *     tags:
 *       - User
 *     responses:
 *       302:
 *         description: Başarıyla çıkış yapıldı ve ana sayfaya yönlendirme
 *       500:
 *         description: Sunucu hatası
 */





router.get("/logout", userController.logout);
router.get("/:id/verify/:token", userController.emailLink);
router.post("/register", userController.registerPost);
router.post("/login", userController.loginPost);


router.post('/api/register',userController.registerPost);


module.exports = router;