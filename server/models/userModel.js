import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   profilePic: {
      type: String,
      default:
         "https://upload.wikimedia.org/wikipedia/commons/c/c9/Avatar_2_Placeholder_DumDarac.png",
   },
   votedThumbnails: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Thumbnail",
      },
   ],
   projects: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Project",
      },
   ],
   createdAt: {
      type: Date,
      default: Date.now,
   },
   refreshToken: { type: String },
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = async function () {
   const token = jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
   });
   return token;
};

userSchema.methods.generateRefreshToken = async function () {
   const token = jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "10d",
   });
   return token;
};

const User = mongoose.model("User", userSchema);

export default User;
