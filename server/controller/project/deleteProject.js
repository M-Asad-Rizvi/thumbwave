import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js";

const deleteProject = async (req, res) => {
   try {
      const userId = await req.user._id;
      const { _id } = await req.body;

      if (!userId) return res.status(404).json({ message: "User not found", code: 404 });
      if (!_id) return res.status(404).json({ message: "Project ID not found", code: 404 });

      const project = await Project.findOneAndDelete({ _id }).populate("createdBy");
      const user = await User.findOne({ _id: userId });

      if (!project) return res.status(404).json({ message: "No project found", code: 404 });
      if (!user) return res.status(404).json({ message: "User not found", code: 404 });

      await user.updateOne({ $pull: { projects: project._id } });

      res.status(200).json({ message: "Project deleted", code: 200 });
   } catch (error) {
      res.status(404).json({
         message: error?.message || error || "Something went wrong",
         code: 404,
      });
   }
};

export { deleteProject };
