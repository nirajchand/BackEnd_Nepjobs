// Import express library 
const express = require('express')

const router = express.Router();

const controller = require('../controller/UserController')

router.get('/getUsers',controller.getUsers)
router.post('/createUser', controller.createUser)

module.exports = router;
