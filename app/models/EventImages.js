const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventImageSchema = new Schema({
    image: Object,
    event_image_type: { type: Schema.Types.ObjectId, ref: 'EventImageType', required: true, index: true },
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const EventImageObj = mongoose.model('EventImage', EventImageSchema);
module.exports = EventImageObj;