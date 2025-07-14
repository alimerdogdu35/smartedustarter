const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
app.use(express.json());
app.set("view engine", "twig");
app.use(express.static(__dirname + '/public'));

const courseRoute = require("./routes/courseRoute");
const pageRoute = require("./routes/pageRoute");

app.use("/", pageRoute)
app.use("/courses", courseRoute)

mongoose.connect("mongodb://127.0.0.1/smartedudb")
    .then(() => {
        console.log("DB Connection is set.");
        app.listen(3000, () => {
            console.log("App is running.");
        })
    })
    .catch(err => {
        console.log("DB error: " + err);
    })