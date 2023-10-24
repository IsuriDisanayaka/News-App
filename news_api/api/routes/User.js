const express = require('express');
const { User, userValidationSchema } = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ecoisland.app@gmail.com',
        pass: 'npil rvrh dyrx olew',
    },
});

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

router.post('/user/save', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const verificationToken = generateVerificationToken();

        const newUser = new User({
            userId: userCount + 1,
            role: 1,
            
            ...req.body,
            verificationToken:verificationToken,
        });

        await newUser.save();

        const verificationLink = `http://localhost:8080/verify-email?token=${verificationToken}`;
        const emailContent = `
      <html>
        <body>
          <p>Hello,</p>
          <p>Click the button below to verify your email:</p>
          <a href="${verificationLink}" style="display:inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </body>
      </html>
    `;

        const mailOptions = {
            from: 'ecoisland.app@gmail.com',
            to: newUser.email,
            subject: 'Welcome to Derana New 🎉 - Email Verification',
            html: emailContent,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Email verification error: ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({
            success: 'User Saved Successfully. Check your email for verification instructions.',
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
});

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });

    if (user) {
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        return res.status(200).json({ success: 'Email verified successfully.' });
    } else {
        return res.status(400).json({ error: 'Invalid verification token.' });
    }
});

module.exports = router;
