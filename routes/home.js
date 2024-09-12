const express = require("express");
const router = express.Router();
const readdir = require("../handlers/readDir")


router.get("/", function(req, res) {
    res.render("index.html")
});


module.exports = router;