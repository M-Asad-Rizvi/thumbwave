import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";
import Thumbnail from "../../models/thumbnailModel.js";

const canVote = async (req, res) => {
   try {
      const { _id } = req.user;
      const { projectId, thumbnailId } = req.body;
      if (!_id) return res.status(404).json({ message: "User not found", code: 404 });

      if (!projectId || !thumbnailId)
         return res.status(400).json({ message: "All fields are required", code: 400 });

      const loggedInUser = await User.findOne({ _id });

      
   } catch (error) {
      return res.status(500).json(error?.message || error);
   }
};
export { canVote };
