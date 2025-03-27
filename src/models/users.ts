import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    techStack: String,
    experience: Number
});

const Users = mongoose.model("User", userSchema);
export default Users;