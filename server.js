const express = require("express")
const app = express()
const path = require("path")
const nunjucks = require("nunjucks")
const readdir = require("./handlers/readDir")

nunjucks.configure("views", {
    autoescape: true,
    express: app,
    watch: true
})

app.set('view engine', 'njk');

app.use("/", express.static(__dirname + "/zapisky"))

app.get("/", require("./routes/home"))


app.get("/*", function (req, res) {
  const currentPath = path.join(__dirname, `/zapisky/${req.params[0]}`);
    if (!currentPath.includes("favicon.ico")) {
      readdir(currentPath, (err, content) => {
      if (err) {
        res.status(404).send("No directory or file found")
      }
      res.render("folder.html", { content: content, folder: req.params[0] });
    })
  }
})


app.listen(80, () => {
    console.log("Server running on port 80")
})