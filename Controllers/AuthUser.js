const AdminUser = require('../Models/AdminUser');
const jwt = require('jsonwebtoken');

const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}

module.exports.createadmin = async (req, res, next)=> {
    try {
        const { useremail, password } = req.body;
        if (!useremail || !password) {
            return res.json({
                error: true,
                errorMessage: "Invalid credentials"

            })
        }
      
        const admin = { useremail, password  }
        const adminExists = (await AdminUser.findOne({useremail , password})) != null;
        if (adminExists) {
            return res.json({
                error: true,
                errorMessage: "AdminCode already exists"

            })
        }
        await AdminUser.create(admin);
        const newAdmin = await AdminUser.findOne({useremail});
        return res.status(201).json({
            admin: newAdmin,
            message: "User registered successfully"
        })

    } catch (err) {
        console.log(err);
        return res.json({
            error: true,
            errorMessage: "An error has occurred.",
            message:err.message
        })
    }
}

module.exports.loginadmin = async (req, res,next)=>{

    try{
        const { useremail, password } = req.body;
        
        // 1) Check if username and password exist
        if (!useremail || !password) {
            return res.status(400).json({message:"Please provide email and password"})
        }

        // 2) Check if user exists && password is correct
        const user = await AdminUser.findOne({useremail}) 
        if(!user || !(await user.correctPassword(password,user.password))) {
            return res.status(401).json({message:"Incorrect email and password"})
        }
        console.log(user );

        // 3) If everything ok, send token to client
        const token=signToken(user._id);
        res.status(200).json({
            status:'success',
            token,
            message: "Login successful"
        })}
        catch (err) {
            console.log(err);
            return res.json({
                error: true,
                errorMessage: "An error has occurred.",
                message : err.message
            })}}

