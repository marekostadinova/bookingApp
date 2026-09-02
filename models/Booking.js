import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  date: String,
  time: String,
  status: {
    type: String,
    default: "pending",
  },
});

const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);

export default Booking;