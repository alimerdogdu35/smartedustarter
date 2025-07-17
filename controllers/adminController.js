
const Courses = require("../models/courseModel")
const Enrollment = require('../models/enrollment.model');
const Users = require("../models/userModel")

exports.adminPage = async (req,res)=>{
    /* if (!req.session.user && req.session.user?.type != 2) {
         return res.status(401).send("Sadece Yöneticiler Erişebilir");
       }
       
       */
     try{
          
     const teachers = await Users.find({ type: 1 }); // öğretmenler
       const students = await Users.find({ type: 0 }); // öğrenciler
       const courses = await Courses.find().lean();
       const mainCourses = courses.filter(course => !course.parent);
  const enrollments = await Enrollment.find()
       .populate("userId", "name")     // sadece name alanını getir
       .populate("courseId", "name");  // sadece name alanını getir
        
 // Her ana kursa ait alt kursları bağla
 const coursesWithSubs = mainCourses.map(mainCourse => {
   const subCourses = courses.filter(c => c.parent && c.parent.toString() === mainCourse._id.toString());
   return {
     ...mainCourse,
     subCourses
   };
 });
      
       const enrollmentsByCourse = {};
 
       enrollments.forEach(enroll => {
         const courseName = enroll.courseId?.name || "Bilinmeyen Kurs";
         const studentName = enroll.userId?.name || "Bilinmeyen Öğrenci";
   
         if (!enrollmentsByCourse[courseName]) {
           enrollmentsByCourse[courseName] = [];
         }
   
         enrollmentsByCourse[courseName].push(studentName);
       });
 
       res.render("admin/index", {
         owners: teachers,
         users: students,
         courses:coursesWithSubs,
         enrollmentsByCourse: enrollmentsByCourse
       });
         
     }catch(error){
         console.error("Admin panel verileri çekilemedi:", error);
         res.status(500).send("Sunucu hatası");
       
     }
  
 
 }