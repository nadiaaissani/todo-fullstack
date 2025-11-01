import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // email unique
    password: { type: String, required: true }
}, { timestamps: true }); // ajoute createdAt et updatedAt automatiquement

const User = mongoose.model("User", userSchema);

export default User;
