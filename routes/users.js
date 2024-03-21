const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();
const User = require('../models/User');

// регистрация юзера

router.post('/registr', async (req, res) => {

    const user = new User({});

    try {

        const savedUser = await user.save();
            //CREATE AND ASSIGN TOKEN
        const token = jwt.sign({ _id: user._id, type: 0 }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ token: token, user: savedUser })

    } catch (err) {
        res.status(400).send({ message: err });
    }
});

module.exports = router;