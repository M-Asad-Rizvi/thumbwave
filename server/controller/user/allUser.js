import User from "../../models/userModel.js"; // fix path
import jwt from "jsonwebtoken";

const allUser = async (req, res) => {
   try {
      const { accessToken } = await req.cookies;
      const { _id } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

      const user = await User.findOne({ _id: _id });

      res.status(200).json(user);
   } catch (error) {
      res.status(500).json({ error: error.msg });
   }
};

export { allUser };
