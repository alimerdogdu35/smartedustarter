const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const socketIO = require("socket.io");
const http = require("http");
const { Server } = require("socket.io");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const server = http.createServer(app);
const io = new Server(server);



module.exports.io = io;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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


app.use('/', enrollmentRoute);
app.use("/", pageRoute)
app.use("/courses", courseRoute)
app.use("/users", userRoute)
app.use("/admin", adminRoute);


io.on("connection", (socket) => {
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName); // örn: "teachers"
      console.log(`Socket ${socket.id} joined room ${roomName}`);
    });
  });
  
  



mongoose.connect("mongodb://127.0.0.1/smartedudb")
    .then(() => {
        console.log("DB Connection is set.");
        server.listen(3000, () => {
            console.log("App is running.");
        })
    })
    .catch(err => {
        console.log("DB error: " + err);
    })