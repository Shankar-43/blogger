import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const EmailModel = mongoose.models.EmailModel || mongoose.model('EmailModel', Schema);

export default EmailModel;