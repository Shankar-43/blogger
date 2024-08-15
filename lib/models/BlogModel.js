import mongoose from "mongoose";

// Define the schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    authorImg: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now // Use Date.now without parentheses
    },
});

// Check if the model is already defined
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;
