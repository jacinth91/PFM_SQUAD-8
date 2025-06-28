require("dotenv").config({ path: ".env" });
const connectDB = require("./config/db");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const logger = require('./utils/logger');
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


// Swagger documentation route
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Squad-8 Project API Documentation",
  })
);

connectDB();

app.use("/api/private", require("./routes/private"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/transaction", require("./routes/transaction"));
app.use('/api/orders', require("./routes/orders"));
app.use('/api/account', require("./routes/account"));


//server handler
PORT = process.env.PORT || 5000;

// Register audit event listeners
require("./listeners/auditLoginListener");

const server = app.listen(PORT, () => {
  console.log("app listening on port", PORT);
  console.log(
    `Swagger documentation available at: http://localhost:${PORT}/api-docs`
  );
  //console.log("app listning on port", PORT);
  logger.info(`Server running on port ${PORT}`);
});

//utils
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: "Internal server error" });
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  // Optionally notify admin or restart logic
});