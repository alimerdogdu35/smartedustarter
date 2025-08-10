const Users = require("../models/userModel")
const Token = require("../models/emailTokenModel");
const transporter = require('../services/mail.service');
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const Joi = require("joi");
//const {jwt, JWT} = require('google-auth-library');
const jwt = require("jsonwebtoken");

const Mail = require("nodemailer/lib/mailer");

const secretKey = "mySecretKey123";

exports.registerPost = async (req, res) => {
    try {
       // await Users.create(req.body);
       // res.redirect("/login");
       const validate = (data)=> {
        const schema = Joi.object({
          name: Joi.string().required().label("First Name"),
          email: Joi.string().email().required().label("Email"),
          password: Joi.number().required().label("password")
        });
        return schema.validate(data);
      };
      const {error}= validate(req.body);
      if(error) return res.status(400).send({message:error.details[0].message});
     
      let user = await Users.findOne({email: req.body.email});
      if(user) return res.status(409).send({message:"User with given email already exist"})
      
      user = await new Users({...req.body}).save();
      const token = await new Token({
        userId: user._id,
        token: jwt.sign({ email: user.email, _id: user._id }, secretKey, { expiresIn: "1h" })
      }).save();

      const url = `http://localhost:3000/users/${user.id}/verify/${token.token}`
    

      
    const mailOptions = {
        from: 'emir.karakavak@gmail.com', // ✅ .com eksikti
        to: 'alimcan.145@hotmail.com', // kullanıcıya gönder
        subject: 'Please Verify Email!',
        html: `
          <p>Merhaba <strong>${user.name}</strong>,</p>
          <p>Click this link <a href="${url}">here</a> to verify your email</p>
        `
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("E-posta gönderim hatası:", error);
        } else {
          console.log("Kayıt e-postası gönderildi:", info.response);
          return res.redirect("/login");
        }
    });
        


    } catch (error) {   
    
        res.status(500).send({message: "Internally Server Error"})
    }
}

exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await Users.findOne({ email: email });
        if (!user) return res.redirect("/register");

        // Kullanıcı bulundu, session set edelim
        
        if (!user.isVerified) {
            return res.render("login", {
              message: "Lütfen e-postanızı onaylayın. Size gönderilen maili kontrol edin."
            });
          }
          req.session.user = user;
        // Kullanıcı tipine göre yönlendirme
        if (user.type === 0) {
            return res.redirect("/dashboard");
        } else if (user.type === 1) {
            return res.redirect("/dashboard-teacher");
        } else {
            return res.redirect("/admin");
        }
    } catch (error) {
        console.log("login hatası: " + error);
        res.redirect("/login");  // Hata varsa login sayfasına dön
    }
}
     
     exports.emailLink=async(req, res)=> {

        
        try{
          const user = await Users.findOne({_id: req.params.id});
          if(!user) return res.status(400).send({message:"Invalid Link"});
         
          const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
          });
          if(!token) return res.status(400).send({message: "inValid Link"});
          await Users.updateOne({_id: user._id}, {isVerified: true});

          await token.deleteOne();
          
           
          res.status(200).send({message: "Email Verified successfully"})
        }catch(error){
            console.error(error); 
          res.status(500).send({message: "Internally Server Error"});
        }
      }


exports.logout = async (req, res) => {
    try {

        req.session.destroy()
        res.redirect("/")

    } catch (error) {
        console.log("login hatası: " + error);
    }
}