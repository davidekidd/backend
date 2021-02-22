const EventSubCategoryModel = require("./../models/EventSubcategory");
const constantObj = require("./../config/constants");

const lodash = require('lodash');

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

// Get Event Subcategory By Id
exports.GetEventSubCategoryById = (req, res) => {
	EventSubCategoryModel.findOne({_id: req.body._id}).exec(function(err, response) {
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

// Get List Of Event Mobile App
exports.GetEventSubCategoriesMobileApp = (req, res) => {
    EventSubCategoryModel.find({is_deleted: false}).lean()
    .populate('event_title', 'name')
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
            let result = lodash.chain(response).groupBy("event_title.name").map(function(v, i) {
                return {
                    name: i,
                    events: lodash.map(v, function(w, k) {
                        return {
                            _id: w._id,
                            name: w.name,
                            start_date: w.start_date,
                            end_date: w.end_date
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