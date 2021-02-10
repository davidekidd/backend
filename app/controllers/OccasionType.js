const OccasionTypeModel = require("./../models/OccasionType");
const constantObj = require("./../config/constants");

/* Save/Update OccasionType */
exports.CreateOccasionType = (req, res, next) => {
  if (req.body._id) {
    let inputJSON = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null
    };
    OccasionTypeModel.updateOne({ _id: req.body._id }, { $set: inputJSON }, function(err, response) {
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
            message: constantObj.messages.RecordUpdated
        })
    })
  } else {
        OccasionTypeModel(req.body).save(req.body, function(err, response) {
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
}

// Get OccasionTypes
exports.GetOccasionTypes = (req, res, next) => {
    OccasionTypeModel.find().lean().sort({"createdAt": -1}).exec(function(err, response) {
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

// Delete OccasionType.
exports.DeleteOccasionType = (req, res, next) => {
	OccasionTypeModel.remove({_id: req.body._id}, function (err, data) {
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
        })
	})
}

exports.GetOccasionTypeById = (req, res, next) => {
	OccasionTypeModel.findOne({_id: req.params.id}).exec(function(err, response) {
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