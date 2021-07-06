const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        console.log(token)
        if(!verifyToken) throw new Error()
        const user = await User.findOne({_id:verifyToken._id,jwt:token},{password:0})
        console.log(user)
        if(!user) throw new Error()
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Unauthorised token'})
    }
}

module.exports = auth;