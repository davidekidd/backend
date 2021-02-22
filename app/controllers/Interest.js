const InterestModel = require("./../models/Interest");
const constantObj = require("./../config/constants");

const lodash = require('lodash');

/* Save Interest */
exports.CreateInterest = (req, res) => {
    InterestModel(req.body).save(req.body, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        } 

        return res.jsonp({
            status: 'Success',
            messageId: 200,
            message: constantObj.messages.RecordCreated
        })
    })
}

/* Update Interest */
exports.UpdateInterest = (req, res) => {
    let inputJSON = {
        name: req.body.name,
        type: req.body.type
    };
    InterestModel.updateOne({ _id: req.body._id }, { $set: inputJSON }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }
        if(response){
            InterestModel.find({is_deleted: false}).lean().sort({"updatedAt": -1}).exec(function(err, data) {
                if (err) {
                    return res.jsonp({
                        status: 'Failure',
                        messageId: 203,
                        message: constantObj.messages.ErrorRetreivingData
                    })
                }
        
                return res.jsonp({
                    status: 'Success',
                    messageId: 200,
                    message: constantObj.messages.RecordUpdated,
                    data: data
                })
            })
        } else {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }
    })
}

// Get Interests
exports.GetInterests = (req, res) => {
    InterestModel.find({is_deleted: false}).lean().sort({"updatedAt": -1}).exec(function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }

        return res.jsonp({
            status: 'Success',
            messageId: 200,
            message: constantObj.messages.SuccessRetreivingData,
            data: response
        })
    })
}

// Delete Interest.
exports.DeleteInterest = (req, res) => {
    InterestModel.updateOne({ _id: req.body._id }, { $set: {is_deleted: true} }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }

        InterestModel.find({is_deleted: false}).lean().sort({"updatedAt": -1}).exec(function(err, data) {
            if (err) {
                return res.jsonp({
                    status: 'Failure',
                    messageId: 203,
                    message: constantObj.messages.ErrorRetreivingData
                })
            }
    
            return res.jsonp({
                status: 'Success',
                messageId: 200,
                message: constantObj.messages.RecordDeleted,
                data: data
            })
        })
    })
}

exports.GetInterestById = (req, res) => {
	InterestModel.findOne({_id: req.body._id}).exec(function(err, response) {
		if (err) {
			return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
		}

        return res.jsonp({
            status: 'Success',
            messageId: 200,
            message: constantObj.messages.SuccessRetreivingData,
            data: response
        })
    })
}

// Get List Of Interest Mobile App
exports.GetInterestMobileApp = (req, res) => {
    InterestModel.find({is_deleted: false}).lean()
    .sort({"updatedAt": -1})
    .exec(function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }
        if(response.length > 0){
            let result = lodash.chain(response).groupBy("type").map(function(v, i) {
                return {
                    name: i,
                    interests: lodash.map(v, function(w, k) {
                        return {
                            name: w.name
                        }
                    })
                }
            }).value();
    
            return res.jsonp({
                status: 'Success',
                messageId: 200,
                message: constantObj.messages.SuccessRetreivingData,
                data: result
            })
        } else {
            return res.jsonp({
                status: 'Success',
                messageId: 200,
                message: constantObj.messages.SuccessRetreivingData,
                data: []
            })
        }
    })
}