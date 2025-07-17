const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

 
app.set("view engine", "twig");
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'asd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


const courseRoute = require("./routes/courseRoute");
const pageRoute = require("./routes/pageRoute");
const userRoute = require("./routes/userRoute");
const enrollmentRoute = require('./routes/enrollment.route');

const adminRoute = require('./routes/adminRoute');



app.use("/", pageRoute)
app.use("/courses", courseRoute)
app.use("/users", userRoute)
app.use("/admin", adminRoute);



  



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