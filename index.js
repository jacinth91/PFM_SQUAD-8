require("dotenv").config({ path: ".env" });
const connectDB = require("./config/db");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const logger = require('./utils/logger');

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
app.use('/api/orders', require("./routes/orders"));


//server handler
PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("app listening on port", PORT);
  console.log(`Swagger documentation available at: http://localhost:${PORT}/api-docs`);
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
