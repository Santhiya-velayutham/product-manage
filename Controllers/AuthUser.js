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

module.exports.loginadmin = async (req, res, next) => {
    try {
      // 👇 Match this with the frontend (use 'email' if that's what the frontend sends)
      const { email, password } = req.body;
  
      // 1) Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
      }
  
      // 2) Check if user exists and password is correct
      const user = await AdminUser.findOne({ useremail: email });
  
      if (!user) {
        return res.status(401).json({ message: "Incorrect email or password (user not found)" });
      }
  
      const isPasswordCorrect = await user.correctPassword(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect email or password (wrong password)" });
      }
  
      // 3) Create JWT token
      const token = signToken(user._id);
  
      // 4) Send response
      res.status(200).json({
        status: 'success',
        token,
        message: "Login successful",
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({
        error: true,
        errorMessage: "An error has occurred.",
        message: err.message,
      });
    }
  };