const Courses = require("../models/courseModel")
const Enrollment = require('../models/enrollment.model');

exports.index = async (req, res) => {
    // console.log(req.session.user)
    res.render("index", {
        page:"home",
        user: req.session.user || null
    })
}

exports.loginGet = async (req, res) => {
    res.render("login")
}

exports.registerGet = async (req, res) => {
    res.render("register")
}

exports.dashboardGet = async (req, res) => {

    if (!req.session.user) {
        // Giriş yapılmamış, yönlendir
        return res.redirect('/login');
    }

    const enrollments = await Enrollment.find({ userId: req.session.user._id }).populate('courseId');
    const courses = enrollments.map(e => e.courseId);
   
    res.render('dashboard', {
        user: req.session.user,
        courses
    });
};


exports.teacherDashboard = async (req, res) => {
    if (!req.session.user || req.session.user.type !== 1) {
      return res.status(401).send("Sadece öğretmenler erişebilir.");
    }
  

    const teacherName = req.session.user.name;
    const courses = await Courses.find({ owner: req.session.user._id });


  
    const selectedCourseId = req.params.courseId || null;
  
    const filter = selectedCourseId ? { courseId: selectedCourseId } : {
      courseId: { $in: courses.map(c => c._id) }
    };
  
    const enrollments = await Enrollment.find(filter).populate('userId').populate('courseId');
          
    res.render('dashboard-teacher', {
      user: req.session.user,
      enrollments,
      courses,
      selectedCourseId

       
    });       

  };
     
exports.coursesPage = async (req, res) => {
    try {
        const courses = await Courses.find({parent:null}).lean();

        res.render("courses", {
            courses: courses,
            page:"courses",
            user: req.session.user || null
        })
    } catch (error) {

    }
}

exports.subCoursesPage = async (req, res) => {
    try {

        const id = req.params.id;
        const courses = await Courses.find({parent:id}).lean();

        res.render("sub-courses", {
            courses: courses,
            parent:id,
            user: req.session.user

        })
    } catch (error) {

    }
}

exports.contactPage = async (req, res) => {
    try {
        
        res.render("contact", {
            page:"contact"
        })
    } catch (error) {

    }
}

exports.test = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}