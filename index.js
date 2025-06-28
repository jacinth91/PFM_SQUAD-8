require("dotenv").config({ path: ".env" });
const connectDB = require("./config/db");
const express = require("express");

const app = express();

app.use(express.json());


connectDB();


app.use("/api/private", require("./routes/private"));
app.use("/api/auth", require("./routes/auth"));

//server handler
PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("app listning on port", PORT);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Logged error:", err);
  server.close(() => process.exit(1));
});

