var mongoose = require('mongoose'),
Schema = mongoose.Schema,
sanitizeJson = require('mongoose-sanitize-json');

var userSchema = new Schema({
  email: String,
  password: String,
  pets: [{
    type: Schema.Types.ObjectId,
    ref: "PetSchema"
  }]
}, {
  usePushEach: true
});

userSchema.plugin(sanitizeJson);
module.exports = userSchema;
