import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
   try {
      const { refreshToken } = req.body;

      if (!refreshToken || typeof refreshToken !== "string") {
         return res.status(401).json({ message: "Unauthorized" });
      }

      let decodedRefreshToken;
      try {
         decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      } catch (error) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findOne({ _id: decodedRefreshToken._id.toString() });
      if (!user) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      const accessToken = await user.generateAuthToken();

      return res.status(200).json({ accessToken });
   } catch (error) {
      console.error("Refresh Token Error:", error);
      return res.status(500).json({ message: "Internal server error" });
   }
};

export { refreshToken };
