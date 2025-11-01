import mongoose from "mongoose";

const projetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const Project = mongoose.model("Project", projetSchema);

export default Project;
