const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY).toString()
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
        console.log(savedUser)
    } catch (err) {
        console.log(err)
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        !user && res.status(401).json("Wrong Credentails!")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET_KEY).toString(CryptoJS.enc.Utf8)

        hashedPassword !== req.body.password &&
            res.status(401).json("Wrong Password!")
            const accesstoken = jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin,
                username:user.username
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn:"3d"}
            )

        const { password, ...others } = user._doc
        res.status(200).json({others,accesstoken})
    } catch (err) {
        res.status(500).json(err.message)
        console.log(err.message)
    }
})

module.exports = router