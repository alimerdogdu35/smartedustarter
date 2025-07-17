const Users = require("../models/userModel")
exports.registerPost = async (req, res) => {
    try {
        await Users.create(req.body);
        res.redirect("/login");
    } catch (error) {

    }
}

exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await Users.findOne({ email: email });
        if (!user) return res.redirect("/register");

        // Kullanıcı bulundu, session set edelim
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


exports.logout = async (req, res) => {
    try {

        req.session.destroy()
        res.redirect("/")

    } catch (error) {
        console.log("login hatası: " + error);
    }
}