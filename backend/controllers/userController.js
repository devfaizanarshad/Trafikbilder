const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt
const Router = express.Router();
const Users = require('../models/Users');

// Signup Api //
Router.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            const checkEmail = await Users.find({ email: email });
            if (checkEmail.length > 0) {
                res.json({ status: 400, message: "Account with this email already exist"});
            } else {
                // Hash the password before saving it
                const saltRounds = 10; // You can adjust the number of salt rounds
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                const userData = new Users({
                    name, email, password: hashedPassword // Store the hashed password
                });

                const saveUser = await userData.save();

                if (saveUser) {
                    res.json({ status: 200, message: "Signup Successfully", data: saveUser });
                } else {
                    res.json({ status: 500, message: "Error occurred in signup" });
                }
            }
        } else {
            res.json({ status: 400, message: "Please Input All required Information" });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 500, message: "An error occurred while processing your request" });
    }
};

// login Api //
Router.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await Users.findOne({ email: email });
            if (user) {
                // Compare the provided password with the stored hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    res.json({ status: 200, message: "Login Successful", data: user });
                } else {
                    res.json({ status: 400, message: "Password Not Match." });
                }
            } else {
                res.json({ status: 400, message: "This Account Does Not Exist." });
            }
        } else {
            res.json({ status: 400, message: "Please Input All Required Information" });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 500, message: "An error occurred while processing your request" });
    }
};

module.exports = Router;