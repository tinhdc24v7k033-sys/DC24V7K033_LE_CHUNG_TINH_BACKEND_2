require('dotenv').config()
const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
const session = require("express-session");
const passport = require("./app/config/passport");
async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the database!");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
startServer();