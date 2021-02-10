const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageCategorySchema = new Schema({
    name: String,
    description: String,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const ImageCategoryObj = mongoose.model('ImageCategory', ImageCategorySchema);
module.exports = ImageCategoryObj;
