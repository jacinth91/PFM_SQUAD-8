const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/private");
const { protect } = require("../middleware/auth");

/**
 * @swagger
 * /api/private:
 *   get:
 *     summary: Get private data
 *     description: Retrieve private data (requires authentication)
 *     tags: [Private]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Private data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateDataResponse'
 *       401:
 *         description: Unauthorized - authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/",protect, getPrivateData);

module.exports = router;
