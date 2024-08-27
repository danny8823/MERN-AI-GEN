const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// ! ---           IS AUTHENTICATED middlewalre           ---
const isAuthenticated = asyncHandler(async(req,res,next)=>{
    if(req.cookies.token){
        //! VERIFY THE TOKEN
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET) //? ACTUAL USER logged in
        // ? ADD THE USER TO REQ OBJECT
        req.user = await User.findById(decoded?.id).select('-password')
        return next()
    }else{
        return res.status(401).json({
            message: 'NOT AUTHORIZED'
        })
    }
})

module.exports = isAuthenticated;