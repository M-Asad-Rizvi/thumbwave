import Project from "../../models/projectModel.js";

export const readProject = async (req, res) => {
   try {
      const { projectSlug } = await req.body;
      const project = await Project.findOne({ projectSlug })
         .populate("thumbnails")
         .populate("createdBy")
         .populate("votes");

      res.status(200).json(project);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
