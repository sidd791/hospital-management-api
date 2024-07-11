import { Doctor } from "../models/doctor.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const generateLoginToken = async function(userId)  {
  const user = await Doctor.findById(userId);
  const createdToken = user.generateToken();
  user.token.push(createdToken);
  await user.save({ validateBeforeSave: false });
  return createdToken;
};

export const registerDoctor = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    throw new ApiError(404, "Email , password and name are required.");
  }
  const existingDoctor = await Doctor.findOne({ email: email });
  if (existingDoctor) {
    throw new ApiError(404, "User already registerd.");
  }
  const newDoctor = await Doctor.create({
    email,
    password,
    name,
  });
  if (!newDoctor) {
    throw new ApiError(401, "Cant create new doctor in the database");
  }
  const doctor = await Doctor.findOne({ email }).select("-password -token");
  res
    .status(200)
    .json(new ApiResponse(200, doctor, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(404, "Email and password is required");
  }
  const doctor = await Doctor.findOne({ email: email });
  const isPasswordCorrect = doctor.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Password is not correct");
  }
  const token = await generateLoginToken(doctor._id);
  const loggedInDoctor = await Doctor.findById(doctor._id).select(
    "-password -token"
  );
  res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: true })
    .json(new ApiResponse(200, loggedInDoctor, "Doctor has logged in successfully"));
});

export const logout = asyncHandler(async(req, res)=>{
    await Doctor.findByIdAndUpdate({_id : req.user._id}, {
        $set : {
            token : []
        }
    }, {new : true})
    res.status(200).json(new ApiResponse(200, {}, "User logged out successfully."))
})

