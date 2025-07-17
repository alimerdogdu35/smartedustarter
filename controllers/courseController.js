const mongoose = require("mongoose");
const Courses = require("../models/courseModel");
const Enrollment = require('../models/enrollment.model');
const Users = require("../models/userModel")
const transporter = require('../services/mail.service');
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");


exports.createCourse = async (req, res) => {
    if (!req.session.user || req.session.user.type !== 1) {
      return res.status(401).send("Yetkisiz kullanıcı");
    }
    
    const form = new formidable.IncomingForm({
      minFileSize: 0,
      allowEmptyFiles: true,
      multiples: false});
  
    form.parse(req, async (err, fields, files) => {
      try {

        
        if (err) throw err;
  
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        const parent = Array.isArray(fields.parent) ? fields.parent[0] : fields.parent;
  
        let imagePath = null;
       
  
        let imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
       
        if (imageFile && imageFile.size > 0 && imageFile.originalFilename.trim() !== "") {
          const oldPath = imageFile.filepath;
          const fileName = Date.now() + "-" + imageFile.originalFilename;
          const newPath = path.join(__dirname, "../public/uploads", fileName);
  
          const rawData = fs.readFileSync(oldPath);
          fs.writeFileSync(newPath, rawData);
  
          imagePath = "/uploads/" + fileName;
        
        }else {
          // Görsel yoksa varsayılanı ata
          imagePath = "/images/blog_1.jpg";
        }
        const course = await Courses.findOne().sort({ _id: -1 });
        console.log(course.image);
        await Courses.create({
          name,
          description,
          parent: parent || null,
          owner: req.session.user._id,
          image: imagePath,
        });
  
        if (!parent) {
          return res.redirect("/courses");
        } else {
          return res.redirect("/course/" + parent);
        }
      } catch (error) {
        console.error("Kurs kayıt hatası:", error);
        res.status(500).send("Kurs kayıt hatası: " + error.message);
      }
    });
  };
    

  


  exports.enrollCourse = async (req, res) => {
    try {
      if (!req.session.user || req.session.user.type !== 0) {
        return res.status(401).send("Sadece öğrenciler kayıt olabilir.");
      }
  
      const userId = req.session.user._id;
      const courseId = req.body.courseId;
  
      const already = await Enrollment.findOne({ userId, courseId });
      if (already) {
        return res.redirect('/dashboard');
      }
  
      // Kullanıcı ve kurs bilgilerini veritabanından çek
      const user = await Users.findById(userId);
      const course = await Courses.findById(courseId);
  
      await Enrollment.create({ userId, courseId });
  
      const mailOptions = {
        from: 'emir.karakavak@gmail.com', // ✅ .com eksikti
        to: 'alimcan.145@hotmail.com', // kullanıcıya gönder
        subject: 'Kurs Kaydı Başarılı!',
        html: `
          <p>Merhaba <strong>${user.name}</strong>,</p>
          <p><strong>${course.name}</strong> adlı kursa başarılı bir şekilde kayıt oldunuz.</p>
          <p>İyi öğrenmeler!</p>
        `
      };
  
      // E-posta gönderimi → sonra redirect yap
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("E-posta gönderim hatası:", error);
        } else {
          console.log("Kayıt e-postası gönderildi:", info.response);
        }
  
       
        return res.redirect('/dashboard');
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).send("Kayıt sırasında hata oluştu: " + err.message);
    }
  };
  
exports.unenrollCourse = async (req, res) => {
    try {
      if (!req.session.user || req.session.user.type !== 0) {
        return res.status(401).send("Sadece öğrenciler bu işlemi yapabilir.");
      }
  
      const userId = req.session.user._id;
      const courseId = req.body.courseId;
  
      await Enrollment.findOneAndDelete({ userId, courseId });
  
      res.redirect("/dashboard");
    } catch (err) {
      res.status(500).send("Kayıt silinirken hata oluştu: " + err);
    }
  };
  
