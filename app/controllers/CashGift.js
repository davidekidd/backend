const CashGiftModel = require("./../models/CashGift");
const constantObj = require("./../config/constants");

// Save Cash Gift
exports.SaveCashGift = (req, res, next) => {
    CashGiftModel(req.body).save(req.body, function(err, response) {
    if (err) {
      return res.jsonp({
        status: 'Failure',
        messageId: 203,
        message: constantObj.messages.ErrorRetreivingData
      });
    } else {
      return res.jsonp({
        status: 'Success',
        messageId: 200,
        message: constantObj.messages.CashGiftSaved,
        data: response
      });
    }
  });
};