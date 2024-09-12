const fs = require("fs")


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

  module.exports = getDirectoryContent;