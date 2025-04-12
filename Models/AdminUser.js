const mongoose = require("mongoose")
const { Schema } = mongoose ;
const bcrypt = require('bcryptjs');


const adminSchema=new Schema({
    useremail:{type:String},
    password:{
      type:String
}
});

adminSchema.pre('save',async function(next) {
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

adminSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
  }



module.exports = mongoose.model("userLogin",adminSchema);