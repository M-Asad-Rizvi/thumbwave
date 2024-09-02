import User from "../../models/userModel.js"; // fix path

const readUser = async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json(error);
   }
};

export { readUser };
