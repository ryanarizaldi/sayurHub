const mongoose = require('mongoose');
const { Schema} =  mongoose;
const uniqueValidator = require("mongoose-unique-validator");


// hashing password
const { encryptPwd } = require("../helpers/bcrypt");

const adminSchema = new Schema({
  full_name : { 
    type : String,
    require : true, 
    lowercase :true,
    trim : true,
  },
  email : {
    type : String,
    require : true,
    trim : false,
  },
  password : { 
    type : String,
    require : true,
  },
}, { timestamps: true, versionKey: false })

// pre, post hooks
adminSchema.pre("save", async function (next) {
  let user = this;

  if (user.password && user.isModified("password")) {
    user.password = await encryptPwd(user.password);
  }
  next();
});

// unique validator
adminSchema.plugin(uniqueValidator);
const admin = mongoose.model("Admin", adminSchema);

exports.Admin = admin;