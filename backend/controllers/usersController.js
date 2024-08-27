const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");


// ! ----           REGISTRATION       ----
const register = asyncHandler(async(req,res) => {
        const { username, email, password } = req.body
        console.log(req.body)
        // * Validate
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("Please all fields are required");
        }

        // * CHECK THE EMAIL IF TAKEN
        const userExists = await User.findOne({
            email
        })

        if(userExists) {
            res.status(400)
            throw new Error('User already exists.')
        }

        // * HASH THE USER PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // * CREATE THE USER
        const newUser = new User({
            username,
            password:hashedPassword,
            email
        })

        // * ADD the trial will end
        newUser.trialExpires = new Date(
            new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
        )

        // * Save the user
        await newUser.save()

        res.json({
            status: true,
            message: 'Registration was successful',
            user: {
                username,
                email
            }
        })
})
// ! ----               LOGIN          ----
const login = asyncHandler(async(req,res)=> {
    const {email, password} = req.body
    // CHECK FOR EMAIl
    const user = await User.findOne({email})

    if(!user) {
        res.status(401)
        throw new Error('Invalid email or password')
    } 

    // CHECK IF PASSWORD MATCHES
    const isMatch = await bcrypt.compare(password, user?.password)
    if(!isMatch) {
        res.status(401)
        throw new Error('Password does not match')
    }

    // GENERATE TOKEN
    const token = jwt.sign({id: user?._id},process.env.JWT_SECRET,{expiresIn: '3d'}
    )
    
    // SET THE TOKEN INTO THE COOKIE (HTTP ONLY)
    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
    // SEND THE RESPONSE
    res.json({
        status: 'Success',
        id: user?._id,
        messsage: 'Login Success',
        username: user?.username,
        email: user?.email
    })
})
// ! ----              LOGOUT          ----
// ! ----              PROFILE         ----
// ! ----     CHECK USER AUTH STATUS   ----

module.exports = {
    register,
    login
}