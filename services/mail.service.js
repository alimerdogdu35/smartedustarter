const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");



const nodemailer = require('nodemailer');
//MAİL
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'emir.karakavak@gmail.com',
      pass: 'xuqz ixjq vyaj kakp',
    },
  });
  
  // POST /send → formdan gelen verileri alır ve mail gönderir
  app.post('/send', (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
  
    const mailOptions = {
      from: 'emir.karakavak@gmail.com',
      to: 'alimcan.145@hotmail.com', // kendine ya da sabit bir alıcıya
      subject: 'İletişim Formu Mesajı',
      html: `
        <p><strong>Ad:</strong> ${first_name} ${last_name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Mesaj:</strong> ${comments}</p>
      `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('E-posta gönderme hatası:', error);
        return res.status(500).send('E-posta gönderilemedi.');
      }
      console.log('E-posta gönderildi:', info.response);
      res.send('Mesajınız başarıyla gönderildi!');
    });
  });
  module.exports = transporter;