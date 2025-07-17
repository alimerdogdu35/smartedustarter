const mongoose = require("mongoose");
const slugify = require("slugify");
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: null,
    },
    slug: {
        type: String
    },
    description: {
        type: String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, //string
        ref:"User",
        required: true,
    },
    image: {
        type: String,
        default:null
    },
    isVisible: {
        type: Boolean,
        default: true, // varsayılan olarak görünür
    },
    isDeleted: {
        type: Boolean,
        default: false, // varsayılan olarak silinmemiş
    },
    clickCount:{
        type:Number,
        default:0,
    },
})

courseSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});



const Course = mongoose.model('Course', courseSchema);
module.exports = Course;