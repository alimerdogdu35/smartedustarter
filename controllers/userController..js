const Users = require("../models/userModel")
exports.registerPost = async (req, res) => {
    try {
        await Users.create(req.body);
        res.send("ok")
    } catch (error) {

    }
}

exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await Users.findOne({ email: email });
        if (!user) return res.status(400).send("üye ol gel");

        req.session.user = user
        res.redirect("/")

    } catch (error) {
        console.log("login hatası: " + error);
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