import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    percentage10: {
        type: Number,
        required: true,
    },
    percentage12: {
        type: Number,
        required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    }
})

const formSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    formData: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Form = mongoose.model("Form", formSchema);
const User = mongoose.model("User", userSchema);

export { User, Form };