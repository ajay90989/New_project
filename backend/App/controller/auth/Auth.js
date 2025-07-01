"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const User_model = db.Users;

class Auth {



    async login(req, res) {
        try {
            const { UserName, password } = req.body;

            if (!UserName || !password) {
                return res.json({
                    status: false,
                    message: "UserName and Password are required",
                });
            }

            const user = await User_model.findOne({ UserName });

            if (!user) {
                return res.json({
                    status: false,
                    message: "User does not exist",
                });
            }


            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.json({
                    status: false,
                    message: "Incorrect password",
                });
            }

            if (user.Role === "USER" && !user.pin_status) {
                return res.json({
                    status: false,
                    message: "Generate your PIN first",
                    user_id: user._id,
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    Role: user.Role,
                    user_id: user._id,
                    UserName: user.UserName,
                    add_by: user.add_by,
                },
                process.env.SECRET,
                { expiresIn: "8h" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 12 * 60 * 60 * 1000,
            });

            return res.json({
                status: true,
                message: "Login successful",
                data: {
                    token,
                    Role: user.Role,
                    user_id: user._id,
                    UserName: user.UserName,
                    ReferralCode: user.ReferralCode,
                    ReferredBy: user.ReferredBy,
                    parent_id: user.parent_id,
                },
            });

        } catch (error) {
            console.error("Login Error:", error);
            return res.json({
                status: false,
                message: "Server Error",
                error: error.message,
            });
        }
    }


    async signup(req, res) {
        try {
            const { Email, UserName, FullName, password, PhoneNo } = req.body;

            if (!UserName || !password) {
                return res.json({
                    status: false,
                    message: "UserName and password are required",
                });
            }

            const existingUser = await User_model.findOne({ UserName });
            if (existingUser) {
                return res.json({
                    status: false,
                    message: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User_model.create({
                Email,
                UserName,
                FullName,
                password: hashedPassword,
                PhoneNo: PhoneNo

            });

            return res.json({
                status: true,
                message: "User registered successfully",
                data: {
                    user_id: newUser._id,
                    UserName: newUser.UserName,

                },
            });

        } catch (error) {
            console.error("Signup Error:", error);
            return res.json({
                status: false,
                message: "Server Error",
                error: error.message,
            });
        }
    }




}

module.exports = new Auth();
