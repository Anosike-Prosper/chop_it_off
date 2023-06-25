import { Schema, model, Document, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUrlInfo extends Document {
  ip: string;
  agent: string;
  url_Id: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const urlInfoSchema = new Schema<IUrlInfo>(
  {
    ip: {
      type: String,
      required: [true, "Please provide an ip"],
    },
    agent: {
      type: String,
      required: [true, "Please provide a useragent"],
    },
   
    url_Id: { type: Schema.Types.ObjectId, ref: "Url" },
   
  },
  {
    timestamps: true, // Add timestamps fields
  }
);


// 3. Create a Model.
const urlInfoModel = model<IUrlInfo>("urlInfo", urlInfoSchema);

export { urlInfoModel };
