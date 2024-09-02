import User from "../../models/userModel.js";
import Project from "../../models/projectModel.js";
import Thumbnail from "../../models/thumbnailModel.js";
import { randomPass } from "../../utils/randomPass.js";

const createProject = async (req, res) => {
   try {
      const { projectTitle, description, category, thumbnails } = await req.body;
      const userId = await req.user._id;

      if (!projectTitle || !thumbnails || !userId || !description || !category) {
         return res.status(400).json({ message: "All fields are required", code: 400 });
      }

      if (thumbnails.length < 1) {
         return res.status(400).json({ message: "At least one thumbnail is required", code: 400 });
      }
      // Find user
      const user = await User.findById(userId);

      if (!user) {
         return res.status(404).json({ message: "User not found", code: 404 });
      }

      let thumbnailIds = [];
      // Get all thumbnails's URLs and creat new thumbnail each time
      for (let i = 0; i < thumbnails.length; i++) {
         const thumbnailUrl = thumbnails[i]["url"];

         if (!thumbnailUrl) {
            return res.status(400).json({ message: "All thumbnails are required", code: 400 });
         }

         // Create new thumbnail
         const thumbnail = await Thumbnail.create({
            imageUrl: thumbnailUrl,
            creatorId: userId,
         });
         thumbnailIds.push(thumbnail._id);
      }

      // Create new project
      const project = await Project.create({
         projectTitle,
         description,
         thumbnails: thumbnailIds,
         category: category,
         createdBy: userId,
      });

      user.projects.push(project._id);
      await user.save();

      const suffix = randomPass(15);
      const prefix = randomPass(12);
      const randomStr = prefix + "-" + project._id + "-" + suffix;

      project.projectSlug = randomStr;
      await project.save();

      res.status(201).json({ message: "Project created", success: true, data: project });
   } catch (error) {
      console.error("Error in /create route:", error);
      res.status(500).json({ message: "Internal server error", code: 500 });
   }
};

export { createProject };
