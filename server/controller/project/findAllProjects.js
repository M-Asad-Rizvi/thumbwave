import Project from "../../models/projectModel.js";

const findAllProjects = async (req, res) => {
   try {
      const { _id } = await req.user;
      const projects = await Project.find({ createdBy: _id })
         .populate("thumbnails")
         .populate("createdBy")
         .populate("votes");

      res.status(200).json(projects);
   } catch (error) {
      res.status(404).json({ message: error.message, code: 404 });
   }
};

export { findAllProjects };
