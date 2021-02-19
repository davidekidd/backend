const mongoose = require("mongoose");
const chalk = require("chalk");

const UserModel = require("./../models/User");
const ConstantObj = require("./../config/constants");

const DBURL = process.env.LOCAL;

const options = { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}
mongoose.connect(DBURL, options).then(
    () => { /** ready to use*/ 
        console.log('%s MongoDB Connected Successfully.', chalk.green('✓'));

        // mongoose.connection.db.dropCollection("imagecategories",
        //     function(err, result) {
        //         console.log("Collection droped");
        //     }
        // );
        // Creating super admin for first time
        UserModel.findOne({ user_type: 1 }).lean().exec(function(err, data) {
            if (!data) {
                let superAdmin = ConstantObj.superAdminJson;
                let UserObj = new UserModel(superAdmin);
                UserObj.save();
            }
        });
    },
    err => { 
        console.error(err);
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    }
);
  