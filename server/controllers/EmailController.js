const express = require('express')
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/send-one', (req, res, next) => {
    try {
        const TO = req.body.to;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
                }
            });
            
        var mailOptions = {
            from: process.env.EMAIL,
            to: TO,
            subject: 'Purchase from Frontend Store',
            text: 'You can now verify your purchase details in the plataforms purchases section.'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        
    }
})

module.exports = router;