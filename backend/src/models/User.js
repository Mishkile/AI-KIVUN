const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true },
    suite: { type: String, trim: true },
    city: { type: String, trim: true },
    zipcode: { type: String, trim: true },
    geo: {
      lat: { type: String, trim: true },
      lng: { type: String, trim: true }
    }
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    catchPhrase: { type: String, trim: true },
    bs: { type: String, trim: true }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      min: 1
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    phone: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    address: addressSchema,
    company: companySchema,
    purchases: {
      type: [Number],
      required: true,
      validate: [
        {
          validator: (value) => Array.isArray(value) && value.length >= 3,
          message: 'A user must have at least 3 purchased product IDs'
        },
        {
          validator: (value) => new Set(value).size === value.length,
          message: 'Duplicate product IDs are not allowed in purchases'
        }
      ]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
