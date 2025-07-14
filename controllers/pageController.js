const Courses = require("../models/courseModel")

exports.index = async (req, res) => {
    res.render("index", {
        page:"home"
    })
}

exports.loginGet = async (req, res) => {
    res.render("login")
}

exports.registerGet = async (req, res) => {
    res.render("register")
}

exports.coursesPage = async (req, res) => {
    try {
        const courses = await Courses.find({parent:null}).lean();

        res.render("courses", {
            courses: courses,
            page:"courses"
        })
    } catch (error) {

    }
}

exports.subCoursesPage = async (req, res) => {
    try {

        const id = req.params.id;
        const courses = await Courses.find({parent:id}).lean();

        res.render("sub-courses", {
            courses: courses
        })
    } catch (error) {

    }
}

exports.dashboardPage = async (req, res) => {
    try {
        //Kullanıcının kayıtlı olduğu kurslar çekilecek

        res.render("dashboard", {
            page:"dashboard"
        })
    } catch (error) {

    }
}