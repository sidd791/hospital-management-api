import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const doctorSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      requird: true,
    },
    token: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } catch (error) {
    return next(error);
  }
});

doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

doctorSchema.methods.generateToken = function(){
  return jwt.sign(
  { _id: this._id },
  process.env.TOKEN_SECRET,
  { expiresIn: process.env.TOKEN_EXPIRY }
)};

export const Doctor = mongoose.model("Doctor", doctorSchema);
