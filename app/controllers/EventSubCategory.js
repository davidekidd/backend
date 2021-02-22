const EventSubCategoryModel = require("./../models/EventSubcategory");
const constantObj = require("./../config/constants");

/* Save EventSubCategory */
exports.CreateEventSubCategory = (req, res) => {
    EventSubCategoryModel(req.body).save(req.body, function(err, response) {
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

/* Update EventSubCategory */
exports.UpdateEventSubCategory = (req, res) => {
    let inputJSON = {
        event_title: req.body.event_title,
        event_images: req.body.event_images,
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };
    EventSubCategoryModel.updateOne({ _id: req.body._id }, { $set: inputJSON }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }
        if(response){
            EventSubCategoryModel.find({is_deleted: false}).lean().populate('event_images', 'name').populate('event_title', 'name').sort({"updatedAt": -1}).exec(function(err, data) {
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

// Get EventSubCategories
exports.GetEventSubCategories = (req, res) => {
    EventSubCategoryModel.find({is_deleted: false}).lean().populate('event_images', 'name').populate('event_title', 'name').sort({"updatedAt": -1}).exec(function(err, response) {
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

// Delete EventSubCategory.
exports.DeleteEventSubCategory = (req, res) => {
    EventSubCategoryModel.updateOne({ _id: req.body._id }, { $set: {is_deleted: true} }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }

        EventSubCategoryModel.find({is_deleted: false}).lean().populate('event_images', 'name').populate('event_title', 'name').sort({"updatedAt": -1}).exec(function(err, data) {
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

exports.GetEventSubCategoryById = (req, res) => {
	EventSubCategoryModel.findOne({_id: req.body._id}).exec(function(err, response) {
        console.log("err", err, req.body._id)
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