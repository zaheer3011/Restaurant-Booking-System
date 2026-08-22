// email : za6968486@gmail.com
// project name : QuickDine

import mongoose from "mongoose";

export const connectDB = async () : Promise <void> => {
  try {
    const conn = process.env.MONGO_URL;

    if(!conn) {
      throw new Error("MONGO URL is not defined");
    }

    await mongoose.connect(conn);

    console.log(`Database Connected`);
  } catch (error : any) {
    console.error(error.message);
  }
};
