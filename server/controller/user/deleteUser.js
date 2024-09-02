import User from "../../models/userModel.js"; // fix path

const deleteUser = async (req, res) => {
   try {
      const { _id } = await req.user;
      const user = await User.findByIdAndDelete(_id);
      if (!user) return res.status(404).json({ message: "User not found", code: 404 });

      res.user = undefined;
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      res.status(200).json({ user, message: "User deleted" });
   } catch (error) {
      res.status(500).json(error);
   }
};

export { deleteUser };
