const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

const UserObj = require("../models/User");
const constantObj = require("../config/constants");

/*
	Function: Super Admin Login
	Created: RAJESH
*/

exports.Login = (req, res) => {
  UserObj.findOne({ email: req.body.email, user_type: 1}).lean().then(user => {
        if (!user) {
            return res.jsonp({
                status: "Failure",
                messageId: 203,
                message: constantObj.messages.EmailPasswordError
            });
        }

        if(user.user_type != 1 || !user.is_active){
            return res.jsonp({
                status: "Failure",
                messageId: 203,
                message: constantObj.messages.UnauthorizedAccessError
            });
        }

        let password = CryptoJS.AES.decrypt(user.password.toString(), process.env.EncryptionKey);
        let decryptPassword= password.toString(CryptoJS.enc.Utf8);
        console.log('User Password --->> ', decryptPassword, req.body.password);
        if(req.body.password === decryptPassword){
            // Passwords Match, Create JWT Token
            const authToken = jwt.sign({ 
                email: user.email, 
                userId: user._id 
            }, process.env.TOKEN_SECRET, { 
                expiresIn: "7d" 
            });

            return res.jsonp({
                status: "Success",
                messageId: 200,
                message: constantObj.messages.LoginSuccess,
                token: authToken,
                expiresIn: 604800, // 7 Days
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    internationalFormat: user.internationalFormat
                }
            });
        } else {
            // Passwords don't match
            return res.jsonp({
                status: "Failure",
                messageId: 203,
                message: constantObj.messages.EmailPasswordError
            });
        }
    })
    .catch(err => {
        return res.jsonp({
            status: "Failure",
            messageId: 203,
            message: constantObj.messages.ErrorRetreivingData
        });
    });
};
