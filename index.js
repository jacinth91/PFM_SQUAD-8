require("dotenv").config({ path: ".env" });
const connectDB = require("./config/db");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();

app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Squad-8 Project API Documentation"
}));

connectDB();

app.use("/api/private", require("./routes/private"));
app.use("/api/auth", require("./routes/auth"));

//server handler
PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("app listening on port", PORT);
  console.log(`Swagger documentation available at: http://localhost:${PORT}/api-docs`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Logged error:", err);
  server.close(() => process.exit(1));
});

