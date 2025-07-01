"use strict";
const router = require("express").Router();

const {
  login,
  signup,

} = require("../../controller/auth/Auth");

router.post("/login", login);
router.post("/SignIn", signup);



module.exports = router;
