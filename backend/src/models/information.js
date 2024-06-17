import mongoose from 'mongoose'

const { Schema } = mongoose
const Information = new Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    logo: {
        type: Array,
        required: true

    },
    address: {
        type: String,
        required: true

    },
    nameStore: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model("information", Information)