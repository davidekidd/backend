const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSubCategorySchema = new Schema({
    event_title: { type: Schema.Types.ObjectId, ref: 'EventType', required: true, index: true },
    event_images: [{ type: Schema.Types.ObjectId, ref: 'EventImageType', required: true, index: true }],
    name: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const EventSubCategoryObj = mongoose.model('EventSubCategory', EventSubCategorySchema);
module.exports = EventSubCategoryObj;