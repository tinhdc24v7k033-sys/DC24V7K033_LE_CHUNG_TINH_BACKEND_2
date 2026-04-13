const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();

const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);

// Handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào khớp với yêu cầu [cite: 1713]
    return next(new ApiError(404, "Resource not found"));
});

// Define error-handling middleware last
app.use((err, req, res, next) => {
    // Cần sử dụng biến 'err' (đã khai báo ở trên) thay vì 'error' 
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;