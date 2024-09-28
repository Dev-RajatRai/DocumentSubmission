import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  residentialAddress: {
    street1: { type: String, required: true },
    street2: String,
  },
  permanentAddress: {
    street1: String,
    street2: String,
  },
  documents: [
    {
      fileName: { type: String, required: true },
      fileType: { type: String, required: true },
      filePath: { type: String, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
