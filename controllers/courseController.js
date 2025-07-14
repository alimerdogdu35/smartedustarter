const mongoose = require("mongoose");
const Courses = require("../models/courseModel");


exports.createCourse = async (req, res) => {
    try {

        if (req.session.user) {
            if (req.session.user.type === 1) {
                req.body.image.length > 0 ? req.body.image = req.body.image : req.body.image = null

                if (req.body.parent == null) {
                    Courses.create({
                        name: req.body.name,
                        parent: req.body.parent,
                        description: req.body.description,
                        owner: req.session.name,
                        image: req.body.image
                    });
                    res.status(200).redirect("/courses")
                }else{
                    res.status(401).send("unauthorized request");
                }
            }

        } else {
            Courses.create(req.body);
            res.status(200).redirect("/course/" + req.body.parent)
        }


    } catch (error) {
        res.status(400).send("Kurs kayıt hatası: " + error)
    }
}

exports.enrollCourse = async (req, res) => {
    try {

       //session check ve user check
       //kurs var mı yok mu
       //kurs kullanıcı da var mı yok mu 

       //enroll yapacak

    } catch (error) {
    }
}