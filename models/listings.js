import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  description: String,
  price: Number,
  currency: String,
  purpose: String,
  category: [String],
  bedrooms: Number,
  bathrooms: Number,
  floor_level: Number,
  floor_type: String,
  photos: [String],
  phone_number: [String],
  location: {
    lat: Number,
    lon: Number,
    home_no: String,
    street: String,
    township: String,
    state: String,
  },
  tags: [String],
  status: String,
  area: {
    width: Number,
    length: Number,
    lot_width: Number,
    lot_length: Number,
  },
  created_at: Date,
  updated_at: Date,
});
