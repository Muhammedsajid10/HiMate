// import express from 'express'
// import { CreateMessage } from '../controllers/messageController'

// const MessageRoutes=express.Router()

// MessageRoutes.post("create-message", CreateMessage)
// export default MessageRoutes


const express = require('express');
const { CreateMessage ,GetMessage} = require('../controllers/messageController');

const router = express.Router();

console.log("Message Routes Loaded");

router.post('/create-message', CreateMessage);
router.post('/get-message', GetMessage);

module.exports = router;

// export  default router