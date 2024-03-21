const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();

const Board = require('../models/Board');
const { verifyUser } = require('../verifyUser');

// добавление board для юзера

router.post('/add', verifyUser, async (req, res) => {

    const board = new Board({
        name: req.body.name,
        user_id: req.user._id
    });
    try {
        const savedBoard = await board.save();

        res.send(savedBoard);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

//получение всех boards текущего user

router.get('/get', verifyUser, async (req, res) => {

    let board = await Board.find({ user_id: req.user._id, disabled: false });

    res.send(board);
});

// редактирование board для юзера

router.patch('/edit/:id', verifyUser, async (req, res) => {

    try {
        await Board.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        })
        res.send();
    } catch (err) {
        res.status(400).send({ message: err });
    }

});

// удаление board для юзера

router.delete('/:id', verifyUser, async (req, res) => {
    await Board.findByIdAndUpdate(req.params.id, { disabled: true });
    res.send();
});

module.exports = router;