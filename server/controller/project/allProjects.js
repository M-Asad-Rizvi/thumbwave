import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js";

export const allProjects = async (req, res) => {
   try {
      const { _id } = await req.user;
      const user = await User.findById(_id);

      if (!user) return res.status(404).json({ message: "User not found", code: 404 });

      const projects = await Project.find()
         .populate("thumbnails")
         .populate("createdBy")
         .populate("votes");

      res.status(200).json(projects);
   } catch (error) {
      res.status(404).json({ message: error.message, code: 404 });
   }
};
