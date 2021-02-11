const ImageCategoryModel = require("./../models/ImageCategory");
const constantObj = require("./../config/constants");

/* Save/Update ImageCategory */
exports.CreateImageCategory = (req, res, next) => {
    if (req.body._id) {
        let inputJSON = {
            name: req.body.name,
            description: req.body.description ? req.body.description : null
        };
        ImageCategoryModel.updateOne({ _id: req.body._id }, { $set: inputJSON }, function(err, response) {
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
        ImageCategoryModel(req.body).save(req.body, function(err, response) {
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
  
// Get ImageCategorys
exports.GetImageCategories = (req, res, next) => {
    ImageCategoryModel.find().lean().sort({"createdAt": -1}).exec(function(err, response) {
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
  
// Delete ImageCategory.
exports.DeleteImageCategory = (req, res, next) => {
    ImageCategoryModel.remove({_id: req.body._id}, function (err, data) {
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

// GetImageCategoryById
exports.GetImageCategoryById = (req, res, next) => {
    ImageCategoryModel.findOne({_id: req.params.id}).exec(function(err, response) {
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