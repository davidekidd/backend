const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
    name: String,
    type: String,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const InterestObj = mongoose.model('Interest', InterestSchema);
module.exports = InterestObj;
