const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventImageSchema = new Schema({
    name: String,
    description: String,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const EventImageObj = mongoose.model('EventImage', EventImageSchema);
module.exports = EventImageObj;
