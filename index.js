require("dotenv").config({ path: ".env" });
const connectDB = require("./config/db");
const express = require("express");
const logger = require('./utils/logger');

const app = express();

app.use(express.json());


connectDB();


app.use("/api/private", require("./routes/private"));
app.use("/api/auth", require("./routes/auth"));

//server handler
PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  //console.log("app listning on port", PORT);
  logger.info(`Server running on port ${PORT}`);
});

//utils
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

/*process.on("unhandledRejection", (err, promise) => {
  console.log("Logged error:", err);
  server.close(() => process.exit(1));
});*/
