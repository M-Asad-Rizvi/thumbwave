import User from "../../models/userModel.js";
import { randomPass } from "../../utils/randomPass.js";

const googleAuth = async (req, res) => {
   try {
      const { email } = req.body;
      const userExists = await User.findOne({ email });
      let user;
      if (!userExists) {
         user = await User.create({
            ...req.body,
            profilePic: req.body.picture,
            password: randomPass(15),
         });
         user.accessToken = await user.generateAuthToken(user);
         user.refreshToken = await user.generateRefreshToken(user);

         await user.save();
      } else {
         user = userExists;
         user.accessToken = await user.generateAuthToken(user);
         user.refreshToken = await user.generateRefreshToken(user);
         user.profilePic = req.body.picture;

         await user.save();
      }

      const refreshToken = user.refreshToken;
      const accessToken = user.accessToken;

      res.cookie("refreshToken", refreshToken, {
         secure: true,
         httpOnly: true,
         maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days * long living
      })
         .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day * short living
         })
         .status(200)
         .json({
            message: user.accessToken ? "User Logged In" : "User created",
         });
   } catch (error) {
      if (error) res.status(500).json(error);
   }
};

export { googleAuth };
