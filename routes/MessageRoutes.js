// import express from 'express'
// import { CreateMessage } from '../controllers/messageController'

// const MessageRoutes=express.Router()

// MessageRoutes.post("create-message", CreateMessage)
// export default MessageRoutes


const express = require('express');
const {
    CreateMessage,
    GetMessage,
    DeleteMessage
} = require('../controllers/messageController');

const router = express.Router();

router.post('/create-message', CreateMessage);
router.post('/get-message', GetMessage);
router.delete('/delete-message/:messageId', DeleteMessage);

module.exports = router;

