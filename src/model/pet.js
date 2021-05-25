var mongoose = require('mongoose'),
Schema = mongoose.Schema,
sanitizeJson = require('mongoose-sanitize-json');

var petSchema = new Schema({
  name: String,
});

petSchema.plugin(sanitizeJson);
module.exports = petSchema;
