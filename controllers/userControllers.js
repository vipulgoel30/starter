const express = require('express');
const fs = require('fs');

const userFileDirectory = `${__dirname}/../dev-data/data/users.json`;

const users = JSON.parse(fs.readFileSync(userFileDirectory, 'utf-8'));

const checkId = (req, res, next, val) => {
    const [user] = users.filter((user) => user['_id'] === val);
    if (!user)
        res
            .status(404)
            .json({ status: 'fail', message: 'Please enter the valid user ID' });
    else {
        req.userData = user;
        next();
    }
};

const getAllUsers = (req, res) => {
    res
        .status(200)
        .json({ status: 'success', records: users.length, data: { users } });
};

const createUser = (req, res) => {
    const userId = users.at(-1)['_id'] + 1;
    users.push({ "_id": userId, ...req.body });
    fs.writeFile(userFileDirectory, JSON.stringify(users), 'utf-8', (err) => {
        if (err)
            res.status(404).json({ status: 'fail', message: 'Unable to add user' });
        else
            res
                .status(201)
                .json({ status: 'success', records: users.length, data: { users } });
    });
};

const getUser = (req, res) => {
    res.status(200).json({ status: 'success', data: req.userData });
};

const updateUser = (req, res) => {
    const userIndex = users.indexOf(req.userData);
    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFile(userFileDirectory, JSON.stringify(users), 'utf-8', (err) => {
        if (err)
            res
                .status(404)
                .json({ status: 'fail', message: 'Unable to update the user' });
        else
            res
                .status(200)
                .json({ status: 'success', records: users.length, data: { users } });
    });
};

const deleteUser = (req, res) => {
    const userIndex = users.indexOf(req.userData);
    users.splice(userIndex, 1);
    res.status(204).json({ status: "success", records: users.length, data: { users } })
};

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    checkId,
};
