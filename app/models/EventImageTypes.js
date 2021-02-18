const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventImageTypeSchema = new Schema({
    name: String,
    description: String,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const EventImageTypeObj = mongoose.model('EventImageType', EventImageTypeSchema);
module.exports = EventImageTypeObj;
