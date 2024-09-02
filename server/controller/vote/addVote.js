import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";
import Thumbnail from "../../models/thumbnailModel.js";

const addVote = async (req, res) => {
   try {
      const { _id } = req.user; // id of logged in user
      const { projectId, thumbnailId } = req.body; // id of project and thumbnail to be voted

      if (!_id || !projectId || !thumbnailId) {
         return res.status(400).json({ message: "All fields are required", code: 400 });
      }

      const loggedInUser = await User.findById(_id);
      if (!loggedInUser) {
         return res.status(404).json({ message: "User not found", code: 404 });
      }

      const project = await Project.findById(projectId);
      if (!project) {
         return res.status(404).json({ message: "Project not found", code: 404 });
      }

      const thumbnail = await Thumbnail.findById(thumbnailId);
      if (!thumbnail) {
         return res.status(404).json({ message: "Thumbnail not found", code: 404 });
      }

      // Add thumbnail to votedThumbnails array
      loggedInUser.votedThumbnails.push(thumbnailId);
      await loggedInUser.save();

      // Add user to project's votes array
      project.votes.push({ votedBy: loggedInUser._id, votedThumbnail: thumbnailId });
      await project.save();

      // Add user to thumbnail's votes array
      thumbnail.votes.push(loggedInUser._id);
      await thumbnail.save();

      res.status(200).json({ message: "Vote added successfully", code: 200 });
   } catch (error) {
      console.error("Error in addVote:", error);
      res.status(500).json({ message: "Internal server error", code: 500 });
   }
};

export { addVote };
