require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const nunjucks = require("nunjucks")
const readdir = require("./handlers/readDir")
const logger = require("./handlers/logger")

nunjucks.configure("views", {
    autoescape: true,
    express: app,
    watch: true
})

// DB
const db = require("./handlers/database")
  try {
    db.sync()
    db.authenticate()
    logger.logSuccess("Connected to the database")
  } catch (error) {
    logger.logError("Unable to connect to the database" + error)
  }


app.set('view engine', 'njk');

app.use("/", express.static(__dirname + "/zapisky"))

app.get("/", require("./routes/home"))


app.get("/*", function (req, res) {
  const currentPath = path.join(__dirname, `/zapisky/${req.params[0]}`);
    if (!currentPath.includes("favicon.ico")) {
      readdir(currentPath, (err, content) => {
      if (err) {
        res.redirect("/")
      } else {
        res.render("folder.html", { content: content, folder: req.params[0] });
      }
    })
  }
})


app.listen(80, () => {
    logger.logInfo("Server running on port 80")
})