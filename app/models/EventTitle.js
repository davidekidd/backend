const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventTypeSchema = new Schema({
    name: String,
    description: String,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const EventTypeObj = mongoose.model('EventType', EventTypeSchema);
module.exports = EventTypeObj;
