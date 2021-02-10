const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OccasionTypeSchema = new Schema({
    name: String,
    description: String,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const OccasionTypeObj = mongoose.model('OccasionType', OccasionTypeSchema);
module.exports = OccasionTypeObj;
