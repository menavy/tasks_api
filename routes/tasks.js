const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = express.Router();

const Task = require('../models/Task');
const { verifyUser } = require('../verifyUser');
const Board = require('../models/Board');

// добавление task для юзера

router.post('/add', verifyUser, async (req, res) => {

    const task = new Task({
        name: req.body.name,
        task: req.body.task,
        status: req.body.status,
        board_id: req.body.board_id
    });
    try {
        const savedTask = await task.save();

        res.send(savedTask);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

//получение всех tasks в конкретной board

router.get('/get/:id', verifyUser, async (req, res) => {
    let board;

    try {
        board = await Board.findById(req.params.id);

    } catch (err) {
        return res.status(400).send({ message: 'No such board' });
    }

    if (!board) {
        return res.status(400).send({ message: 'No such board' });
    }

    let tasks = await Task.find({ board_id: req.params.id, disabled: false });

    res.send(tasks);
});

// редактирование task для юзера

router.patch('/edit/:id', verifyUser, async (req, res) => {

    try {
        let editedTask = await Task.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            task: req.body.task,
            status: req.body.status,
            order: req.body.order
        })
        res.send(editedTask);
    } catch (err) {
        res.status(400).send({ message: err });
    }

});

// удаление task для юзера

router.delete('/:id', verifyUser, async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, { disabled: true });
    res.send();
});

module.exports = router;