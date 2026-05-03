const jwt = require("jsonwebtoken");

// Dữ liệu mẫu (Thay thế bằng DB sau)
const users = [
    {
        email: "admin@gmail.com",
        password: "123456"
    }
];

// Logic cho đăng nhập truyền thống
exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(401).send({ message: "Wrong password" });
    }

    const token = jwt.sign(
        { email: user.email },
        "SECRET_KEY",
        { expiresIn: "1h" }
    );

    res.send({ token });
};

// Logic xử lý sau khi Google callback thành công
exports.googleCallback = (req, res) => {
    // Lấy thông tin user từ passport cung cấp
    const email = req.user.emails[0].value;

    // Tạo token thật từ email Google
    const token = jwt.sign(
        { email: email },
        "SECRET_KEY",
        { expiresIn: "1h" }
    );

    // Redirect về Frontend kèm theo token
    res.redirect(`http://localhost:3001?token=${token}`);
};


exports.facebookCallback = (req, res) => {
    const email = req.user.emails?.[0]?.value || "facebook_user";

    const token = jwt.sign(
        { email },
        "SECRET_KEY",
        { expiresIn: "1h" }
    );

    res.redirect(`http://localhost:3001?token=${token}`);
};