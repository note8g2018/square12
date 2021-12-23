const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
//const csurf = require("csurf");
const errorHandler = require('../middleware/errorHandler');

const register = require('./register_R');
const login = require('./login_R');
const forgotPassword = require('./forgotPassword_R');
const resetPassword = require('./resetPassword_R');
const testPrivate = require('./testPrivate_R');
const protect = require('../middleware/authentication');

const start = (app)=>
{
    //const app = express();
    // const csurfProtection = csurf(
    //     //{ cookie: true }
    //     );
    const MongoURI = process.env.DATABASE_URL;

    // const store = new MongoDBStore({
    //     uri: MongoURI,
    //     databaseName: "compose",
    //     collection: "mySessions",
    // });

    app.use(express.static("../public"));
    //app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    //app.use(csurfProtection);
    // app.use(
    //     session({
    //         secret: "fuck microsoft",
    //         resave: false,
    //         saveUninitialized: false,
    //         store: store,
    //         //cookie:{secure: true}
    //     })
    // );

    app.use('/register', register);
    app.use('/login', login);
    app.use('/forgotPassword', forgotPassword);
    //app.use(protect);
    app.use('/resetPassword', resetPassword);
    app.use(protect);
    app.use('/private', require("./testPrivate_R"));

    // errorHandler must be the last one
    app.use(errorHandler);

    app.get("/", (req, res) =>
    {
        //console.log(req.cookies);
        //req.session.isAuth = true;
        //console.log(req.session);
        res.send("<h1>Hello me 1</h1>");
    });
};

module.exports = start;
