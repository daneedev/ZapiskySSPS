const fs = require("fs")
const dayjs = require("dayjs")
const path = require("path");

function getDirectoryContent(directoryPath, callback) {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return callback(err, null);
      }
  
      const fileList = [];
  
      files.forEach((file) => {
        const fullPath = path.join(directoryPath, file);
        const fileStats = fs.statSync(fullPath);
  
        if (!fileStats.isDirectory()) {
          const object = {
            name: file,
            date: dayjs(fileStats.mtime).format("DD.MM.YYYY"),
            size: fileStats.size / (1024*1024),
          }
          fileList.push(object);
        }
      });
  
  
      callback(null, fileList);
    });
  }

  module.exports = getDirectoryContent;