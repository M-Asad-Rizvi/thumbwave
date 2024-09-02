import User from "../../models/userModel.js"; // fix path
import { randomPass } from "../../utils/randomPass.js";

const createUser = async (req, res) => {
   try {
      const { name, email } = await req.body;

      const password = (await req.body.password) || randomPass(15);

      const payload = { name, email, password };

      const picture = await req.body.picture;
      if (picture) payload.profilePic = picture;

      const user = await User.create(payload);

      const accessToken = await user.generateAuthToken();
      const refreshToken = await user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
         secure: true,
         httpOnly: true,
         maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days * long living
      });

      res.cookie("accessToken", accessToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000, // 1 day * short living
      });
      res.status(201).json({ message: "User created", success: true });
   } catch (error) {
      res.status(500).json(error);
   }
};

export { createUser };
