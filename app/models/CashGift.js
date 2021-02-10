const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose, 3);

const CashGiftSchema = new Schema({
    full_name: String,
    nick_name: String,
    recipient_name: String,
    recipient_nick_name: String,
    cash_gift: Float,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

const CashGiftObj = mongoose.model('CashGift', CashGiftSchema);
module.exports = CashGiftObj;
