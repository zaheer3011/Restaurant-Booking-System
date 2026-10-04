import { Schema, Document, model } from "mongoose"; 

export interface IUser extends Document {
    name : string;
    email : string;
    password? : string;
    phone? : string;
    role : "user" | "admin" | "owner";
    createdAt : Date;
    updatedAt : Date

}

const userSchema = new Schema <IUser> (
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

// Remove password when converting to JSON

userSchema.set("toJSON", {
  transform : (doc, ret) => {
    delete ret.password;
    return ret
  }
})

export const User = model<IUser> ("User", userSchema);
