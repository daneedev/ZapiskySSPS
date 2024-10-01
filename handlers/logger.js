const colors = require("colors")

function logSuccess(message) {
    console.log(colors.green("[SUCCESS] " + message))
}

function logError(message) {
    console.log(colors.red("[ERROR] " + message))
}

function logWarning(message) {
    console.log(colors.yellow("[WARNING] " + message))
}

function logInfo(message) {
    console.log(colors.blue("[INFO] " + message))
}

module.exports = {
    logSuccess,
    logError,
    logWarning,
    logInfo
}