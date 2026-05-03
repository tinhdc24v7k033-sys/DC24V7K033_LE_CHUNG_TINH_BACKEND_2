const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");

// Route cho đăng nhập truyền thống (POST)
router.post("/login", authController.login);

// Route bắt đầu đăng nhập Google
router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route xử lý callback từ Google
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    authController.googleCallback
);

// LOGIN FACEBOOK
router.get("/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
);

// CALLBACK FACEBOOK
router.get("/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    authController.facebookCallback
);
module.exports = router;