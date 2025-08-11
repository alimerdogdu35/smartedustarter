const express = require("express");
const router = express.Router();
const {courseCounter} = require("../middlewares/courseMiddleware");

const courseController = require("../controllers/courseController");
const pageController = require("../controllers/pageController");


/**
 * @swagger
 * /:
 *   get:
 *     summary: Ana sayfa - kullanıcı bilgisi varsa gönderir
 *     tags:
 *       - Page
 *     responses:
 *       200:
 *         description: Ana sayfa HTML döner
 */

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Giriş sayfasını getirir
 *     tags:
 *       - Page
 *     responses:
 *       200:
 *         description: Giriş sayfası HTML döner
 */

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Kayıt sayfasını getirir
 *     tags:
 *       - Page
 *     responses:
 *       200:
 *         description: Kayıt sayfası HTML döner
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Öğrenci paneli sayfasını döner, giriş yapılmamışsa /login sayfasına yönlendirir
 *     tags:
 *       - Page
 *     responses:
 *       302:
 *         description: Giriş yoksa login sayfasına yönlendirme
 *       200:
 *         description: Öğrenci dashboard HTML döner
 */

/**
 * @swagger
 * /dashboard-teacher:
 *   get:
 *     summary: Öğretmen panelini döner, yalnızca öğretmen erişebilir
 *     tags:
 *       - Page
 *     responses:
 *       401:
 *         description: Yetkisiz erişim (öğretmen değil)
 *       200:
 *         description: Öğretmen dashboard HTML döner
 */

/**
 * @swagger
 * /dashboard-teacher/{courseId}:
 *   get:
 *     summary: Öğretmen paneli belirli kurs için, opsiyonel courseId parametresi
 *     tags:
 *       - Page
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: false
 *         description: Kurs ID
 *     responses:
 *       401:
 *         description: Yetkisiz erişim (öğretmen değil)
 *       200:
 *         description: Öğretmen dashboard HTML döner
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Ana kursların listesi
 *     tags:
 *       - Page
 *     responses:
 *       200:
 *         description: Kurslar sayfası HTML döner
 */

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Belirli bir kursun alt kurslarını listeler
 *     tags:
 *       - Page
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kurs ID
 *     responses:
 *       200:
 *         description: Alt kurslar sayfası HTML döner
 */

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: İletişim sayfasını getirir
 *     tags:
 *       - Page
 *     responses:
 *       200:
 *         description: İletişim sayfası HTML döner
 */



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