require('dotenv').config()
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./app/config/passport");
const authRouter = require("./app/routes/auth.route"); // CHỈ 1 DÒNG NÀY

const app = express();

app.use(cors());
app.use(express.json());

// Phải có session cho Passport
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Gắn route
app.use("/api/auth", authRouter);

// ... các cấu hình khác
module.exports = app;