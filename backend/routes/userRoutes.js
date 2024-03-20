const express = require('express'); 
const { login, addUser, updateUser, deleteUser, signupUser } = require('../controller/user');
const { checkRole } = require('../middleware/middleware');



const router = express.Router();

router.post('/login',login);
router.post('/add-user',checkRole('admin'), addUser);
router.put('/update-user/:username',checkRole('admin'),updateUser);
router.post('/signup',signupUser);
router.delete('/delete-user/:username',checkRole('admin'),deleteUser);


module.exports= router;

