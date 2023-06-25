import { Schema, model, connect, Model, Types, Document } from "mongoose";
import bcrypt from "bcrypt";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
  email: string;
  password: string;
  correctPassword(candidatePassword: string, userPassword: string): boolean;

  // urls: Types.ObjectId;
}

// interface userModel extends Model<IUser> {

// }

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      trim:true
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      trim:true
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Please provide a password"],
      select:false,
      trim:true
    },
    // urls: { type: Schema.Types.ObjectId, ref: "Url" },
  },
  {
    timestamps: true, // Add timestamps fields
  }
);



userSchema.pre<IUser>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.method(
  "correctPassword",
  async function (
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);

// 3. Create a Model.
// const userModel = model<IUser>("User", userSchema);
const userModel = model<IUser>("User", userSchema);

export { userModel, IUser };



