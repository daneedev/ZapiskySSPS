const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")

app.set("view engine", "ejs")

app.use("/", express.static(__dirname + "/zapisky"))

function getDirectoryContent(directoryPath, callback) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return callback(err, null);
    }

    const fileList = [];
    const folderList = [];

    files.forEach((file) => {
      const fullPath = path.join(directoryPath, file);
      const fileStats = fs.statSync(fullPath);

      if (fileStats.isDirectory()) {
        folderList.push(file);
      } else {
        fileList.push(file);
      }
    });

    const content = {
      folders: folderList,
      files: fileList,
    };

    callback(null, content);
  });
}

app.get("/*", function (req, res) {
      const currentPath = path.join(__dirname, `/zapisky/${req.params[0]}`);
if (!currentPath.includes("favicon.ico")) {
  getDirectoryContent(currentPath, (err, content) => {
    if (err) {
      res.status(404).send("No directory or file found")
    }
    res.render(__dirname + "/views/index.ejs", { content: content, currentPath: currentPath, path: path, __dirname : __dirname, currentFolder: req.params[0]});
  })
}
})
app.listen(80, () => {
    console.log("Server running on port 80")
})