'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('users').doc().set(data);
    res.send('Record saved successfully')
  } catch (error) {
    res.status(404).send(error.message);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await firestore.collection('users');
    const data = await users.get();
    const usersArray = [];
    if (data.empty) {
      res.status(404).send('No users found');
    } else {
      data.forEach(doc => {
        const user = new User(
          doc.id,
          doc.data().namaUser,
          doc.data().emailUser,
          doc.data().noTelpUser,
          doc.data().username,
          doc.data().password
        );
        usersArray.push(user);
      });
      res.send(usersArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getUser = async (req, res, next) => {
  try {
    const idUser = req.params.idUser;
    const user = await firestore.collection('users').doc(idUser);
    const data =  await user.get();
    if (!data.exists) {
      res.status(404).send('User with the given ID not found');
    } else {
      res.send(data.data());  
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addUser,
  getAllUsers,
  getUser
}