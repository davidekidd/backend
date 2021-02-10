const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseIntlPhoneNumber = require('mongoose-intl-phone-number');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
  mobile: { type: String, unique: true, required: 'Please enter valid phone number.' },
  password: String,
  first_name: String,
  last_name: String,
  user_type: {
    type: Number,
    enum: [1]   //[Super Admin(1)]
  },
  is_active: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.plugin(mongooseIntlPhoneNumber, {
  hook: 'validate',
  phoneNumberField: 'mobile',
  nationalFormatField: 'national_format',
  internationalFormat: 'international_format',
  countryCodeField: 'country_code',
});

const UserObj = mongoose.model('User', UserSchema);
module.exports = UserObj;
