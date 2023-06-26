import { Schema, model, Document, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUrl extends Document {
  longurl: string;
  shorturl: string;
  shortId: string;
  ownerId: Types.ObjectId;
  click: Number;
}

// 2. Create a Schema corresponding to the document interface.
const urlSchema = new Schema<IUrl>(
  {
    longurl: {
      type: String,
      required: [true, "Please provide a longurl"],
      trim:true
    },
    shorturl: {
      type: String,
      required: [true, "Please provide a shorturl"],
      trim:true
    },
    shortId: {
      type: String,
      unique:true,
      required: [true, "Please provide a shortId"],
      trim:true
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    click: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Add timestamps fields
  }
);


// 3. Create a Model.
const urlModel = model<IUrl>("Url", urlSchema);

export { urlModel, IUrl };
