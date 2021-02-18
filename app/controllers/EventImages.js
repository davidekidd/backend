const EventImageTypeModel = require("../models/EventImageTypes");
const EventImagesModel = require("../models/EventImages");

const constantObj = require("../config/constants");

const upload = require('../common/ImageUploader');
const singleUpload = upload.single('image');

const aws = require('aws-sdk');
const s3 = new aws.S3();

/* Save EventImage */
exports.CreateEventImage = (req, res, next) => {
    EventImageTypeModel(req.body).save(req.body, function(err, response) {
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

/* Update EventImage */
exports.UpdateEventImage = (req, res) => {
    let inputJSON = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null
    };
    EventImageTypeModel.updateOne({ _id: req.body._id }, { $set: inputJSON }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }
        if(response){
            EventImageTypeModel.find({is_deleted: false}).lean().sort({"createdAt": -1}).exec(function(err, data) {
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
  
// Get EventImages
exports.GetImageCategories = (req, res, next) => {
    EventImageTypeModel.find({is_deleted: false}).lean().sort({"createdAt": -1}).exec(function(err, response) {
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
  
// Delete EventImage.
exports.DeleteEventImage = (req, res, next) => {
    EventImageTypeModel.updateOne({ _id: req.body._id }, { $set: {is_deleted: true} }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }

        EventImageTypeModel.find({is_deleted: false}).lean().sort({"updatedAt": -1}).exec(function(err, data) {
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

// GetEventImageById
exports.GetEventImageById = (req, res, next) => {
    EventImageTypeModel.findOne({_id: req.body._id}).exec(function(err, response) {
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

exports.UploadImage = (req, res) => {
    singleUpload(req, res, function(err) {
      if (err) {
        return res.jsonp({
            status: 'Failure',
            messageId: 203,
            message: constantObj.messages.ErrorRetreivingData
        });
      } 
      return res.jsonp({
        status: 'Success',
        messageId: 200,
        data: req.file
      });
    });
};

exports.UploadImageData = (req, res) => {
    let Input = req.body;
    SaveEachImage(Input, 0, res);
};

function SaveEachImage(Input, k, res){
    if(k < Input.image_types.length){
        let InputJSON = {
            image: Input.image,
            event_image_type: Input.image_types[k]
        }
        EventImagesModel(InputJSON).save(InputJSON, function(err, response) {
            k++;
            SaveEachImage(Input, k, res);
        })
    } else {
        return res.jsonp({
            status: 'Success',
            messageId: 200,
            message: constantObj.messages.ImageUploaded,
        });
    }
}

// Get EventImages
exports.GetEventImageList = (req, res, next) => {
    EventImagesModel.find({is_deleted: false}).populate('event_image_type', 'name').lean().sort({"createdAt": -1}).exec(function(err, response) {
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

exports.DeleteUploadedImage = (req, res, next) => {
    EventImagesModel.updateOne({ _id: req.body._id }, { $set: {is_deleted: true} }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }

        EventImagesModel.find({is_deleted: false}).lean().sort({"updatedAt": -1}).exec(function(err, data) {
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
                message: constantObj.messages.ImageDeleted,
                data: data
            })

            // const params = {
            //     Bucket: process.env.Bucket,
            //     Key: req.body.filename
            // };
            // s3.deleteObject(params, function(err, data1) {
            //     if (err) {
            //         return res.jsonp({
            //             status: 'failed',
            //             messageId: 203,
            //             message: constantObj.messages.ErrorRetreivingData
            //         })
            //     }

            //     return res.jsonp({
            //         status: 'Success',
            //         messageId: 200,
            //         message: constantObj.messages.ImageDeleted,
            //         data: data
            //     })
            // });
        })
    })
}