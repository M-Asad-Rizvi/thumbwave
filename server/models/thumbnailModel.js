import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema({
   imageUrl: {
      type: String,
      required: true,
   },
   creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   uploadedAt: {
      type: Date,
      default: Date.now,
   },
   votes: [
      {
         votedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
         },
      },
   ],
});

export default mongoose.model("Thumbnail", thumbnailSchema);
