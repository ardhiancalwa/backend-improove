const express = require('express');
const {addUser, getAllUsers, getUser} = require('../controllers/userController');

const router = express.Router();

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:idUser', getUser);

module.exports = {
  routes: router
}