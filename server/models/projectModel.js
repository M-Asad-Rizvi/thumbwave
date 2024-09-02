import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
   projectTitle: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   thumbnails: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Thumbnail",
      },
   ],
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   votes: [
      {
         votedThumbnail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thumbnail",
         },
         votedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
         },
      },
   ],
   category: {
      type: String,
      required: true,
      enum: [
         "animation",
         "art",
         "beauty",
         "business",
         "comedy",
         "cooking",
         "documentary",
         "education",
         "entertainment",
         "fashion",
         "fitness",
         "food",
         "gaming",
         "health",
         "how-to",
         "lifestyle",
         "marketing",
         "music",
         "news",
         "podcast",
         "product reviews",
         "science",
         "sports",
         "technology",
         "travel",
         "vlog",
         "wildlife",
         "other",
      ],
   },
   projectSlug: {
      type: String,
      unique: true,
   },
   projectViews: {
      type: Number,
      default: 0,
   },
});

export default mongoose.model("Project", projectSchema);
