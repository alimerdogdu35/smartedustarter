const mongoose = require("mongoose");
const Courses = require("../models/courseModel");


exports.createCourse = async (req, res) => {
    try {

        Courses.create(req.body);
        res.status(200).send("Course created successfully.")

    } catch (error) {
        res.status(400).send("Kurs kayıt hatası: " + error)

    }
}