const mongoose = require("mongoose");
const Courses = require("../models/courseModel");

const courseCounter = async (req, res, next) => {
    let course = req.params.id;
    let courseCheck = await Courses.findById(course);

    if (!courseCheck) {
        return res.status(400).send("Kurs bulunamadı");
    }


    await Courses.findByIdAndUpdate(
        courseCheck._id,
        { $inc: { clickCount: 1 } },
        { new: true }
    );

   next();
};

module.exports = { courseCounter };

