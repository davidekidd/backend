const EventImageModel = require("../models/EventImages");
const constantObj = require("../config/constants");

const upload = require('../common/ImageUploader');
const singleUpload = upload.single('image');

const aws = require('aws-sdk');
const s3 = new aws.S3();

/* Save EventImage */
exports.CreateEventImage = (req, res, next) => {
    EventImageModel(req.body).save(req.body, function(err, response) {
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
    EventImageModel.updateOne({ _id: req.body._id }, { $set: inputJSON }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }
        if(response){
            EventImageModel.find({is_deleted: false}).lean().sort({"createdAt": -1}).exec(function(err, data) {
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
    EventImageModel.find({is_deleted: false}).lean().sort({"createdAt": -1}).exec(function(err, response) {
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
    EventImageModel.updateOne({ _id: req.body._id }, { $set: {is_deleted: true} }, function(err, response) {
        if (err) {
            return res.jsonp({
                status: 'Failure',
                messageId: 203,
                message: constantObj.messages.ErrorRetreivingData
            })
        }

        EventImageModel.find({is_deleted: false}).lean().sort({"updatedAt": -1}).exec(function(err, data) {
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
    EventImageModel.findOne({_id: req.body._id}).exec(function(err, response) {
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
    console.log("req 1", req.body)
    singleUpload(req, res, function(err) {
      if (err) {
        console.log(err);
        return res.jsonp({
            status: 'Failure',
            messageId: 203,
            message: constantObj.messages.ErrorRetreivingData
        });
      } 

      console.log("req.file", req.file);
      return res.jsonp({
        status: 'Success',
        messageId: 200,
        message: constantObj.messages.ImageUploaded,
        data: req.file
      });
    });
};

exports.DeleteUploadedImage = (req, res, next) => {
    const params = {
      Bucket: process.env.Bucket,
      Key: req.body.filename
    };
    s3.deleteObject(params, function(err, data) {
      if (err) {
        return res.jsonp({
          status: 'failed',
          messageId: 203,
          message: constantObj.messages.ErrorRetreivingData
        })
      }
      return  res.jsonp({
        status: 'success',
        messageId: 200,
        message: constantObj.messages.ImageDeleted
      })
    });
}