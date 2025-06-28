const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - pricePerShare
 *         - quantity
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           description: Name of the product
 *           example: "Apple Inc. Stock"
 *         pricePerShare:
 *           type: number
 *           format: float
 *           description: Price per share of the product
 *           example: 150.75
 *         quantity:
 *           type: number
 *           minimum: 0
 *           description: Quantity of shares available
 *           example: 1000
 *         description:
 *           type: string
 *           description: Optional description of the product
 *           example: "Technology company stock"
 *         category:
 *           type: string
 *           description: Category of the product
 *           example: "Technology"
 *         isActive:
 *           type: boolean
 *           description: Whether the product is active/available
 *           example: true
 *         CREATED_ON:
 *           type: string
 *           format: date-time
 *           description: Date when the product was created
 *           example: 2023-01-01T00:00:00.000Z
 *         CREATED_BY:
 *           type: string
 *           description: User who created this product
 *           example: "admin@example.com"
 *         MODIFIED_ON:
 *           type: string
 *           format: date-time
 *           description: Date when the product was last modified
 *           example: 2023-01-01T00:00:00.000Z
 *         MODIFIED_BY:
 *           type: string
 *           description: User who last modified this product
 *           example: "admin@example.com"
 */

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"]
    },
    pricePerShare: {
      type: Number,
      required: [true, "Please provide price per share"],
      min: [0, "Price per share cannot be negative"],
      validate: {
        validator: function(v) {
          return v >= 0;
        },
        message: "Price per share must be a positive number"
      }
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: [0, "Quantity cannot be negative"],
      default: 0
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"]
    },
    category: {
      type: String,
      enum: ["Technology", "Healthcare", "Finance", "Energy", "Consumer", "Other"],
      default: "Other"
    },
    isActive: {
      type: Boolean,
      default: true
    },
    CREATED_ON: { 
      type: Date, 
      default: Date.now 
    },
    CREATED_BY: {
      type: String
    },
    MODIFIED_ON: {
      type: Date
    },
    MODIFIED_BY: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for total value (price per share * quantity)
ProductSchema.virtual('totalValue').get(function() {
  return this.pricePerShare * this.quantity;
});

// Pre-save middleware to update MODIFIED_ON
ProductSchema.pre('save', function(next) {
  this.MODIFIED_ON = new Date();
  next();
});

// Static method to find active products
ProductSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Instance method to check if product is in stock
ProductSchema.methods.isInStock = function() {
  return this.quantity > 0;
};

// Instance method to update quantity
ProductSchema.methods.updateQuantity = function(newQuantity) {
  if (newQuantity < 0) {
    throw new Error('Quantity cannot be negative');
  }
  this.quantity = newQuantity;
  this.MODIFIED_ON = new Date();
  return this.save();
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product }; 