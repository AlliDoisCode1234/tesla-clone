const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const cardRoutes = require("./routes/cards");
const options = { selector: '#chart', container: '<div id="container"><div id="chart"></div></div>' }
const D3Node = require('d3-node')
const d3n = new D3Node(options) // initializes D3 with container element
const d3 = d3n.d3
d3.select(d3n.document.querySelector('#chart')).append('span') // insert span tag into #chart
d3n.html()   // output: <html><body><div id="container"><div id="chart"><span></span></div></div></body></html>
d3n.chartHTML()   // output: <div id="chart"><span></span></div>



//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/card", cardRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

// Get Bible ID's from DB
app.get('/post/createPost?:search', (req, res) => {
  console.log(req.query);
  res.redirect('/')
})


