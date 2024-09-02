import User from "../../models/userModel.js";

const logout = async (req, res) => {
   try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findOne({ refreshToken });

      if (!user) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      user.refreshToken = null;

      await user.save();

      res.clearCookie("refreshToken");

      res.status(200).json({ message: "Logout successful" });
   } catch (error) {
      res.status(500).json(error);
   }
};

export { logout };
