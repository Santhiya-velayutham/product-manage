const mongoose = require("mongoose")
const { Schema } = mongoose ;
const bcrypt = require('bcryptjs');


const adminSchema=new Schema({
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.pre('save',async function(next) {
  
    // Hash the password with cost of 12
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

adminSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
  }



module.exports = mongoose.model("userLogin",adminSchema);