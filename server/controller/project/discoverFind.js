import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js";

const discoverFind = async (req, res) => {
   try {
      const { q } = req.body;

      if (!q) {
         return res.status(400).json({ message: "Query parameter 'q' is required." });
      }

      // Find projects matching the query
      const foundedProjects = await Project.find({
         $or: [
            { projectTitle: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
            { "createdBy.name": { $regex: q, $options: "i" } },
         ],
      })
         .populate("thumbnails")
         .populate("createdBy")
         .populate("votes"); // Populate votedBy for each vote

      return res.status(200).json({ projects: foundedProjects });
   } catch (error) {
      console.error("Error in discoverFind:", error);
      return res
         .status(500)
         .json({ message: "An error occurred while fetching projects.", error: error.message });
   }
};

export { discoverFind };
