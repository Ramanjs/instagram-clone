const DatauriParser = require('datauri/parser')

const parser = new DatauriParser()

const bufferToDataUri = (fileFormat, buffer) => {
  return parser.format(fileFormat, buffer)
}

module.exports = {
  bufferToDataUri
}
