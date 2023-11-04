const express = require("express")
const app = express()
const fs = require("fs")

app.use("/1rocnik", express.static(__dirname + "/1rocnik"))

app.get("/1rocnik", function (req, res) {
    res.sendFile(__dirname + "/views/1rocnik.html")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("*", function (req, res) {
    res.redirect("/")
})

app.listen(80, () => {
    console.log("Server running on port 80")
})