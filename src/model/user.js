import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'PetSchema',
  }],
  messages: [{
    text: String,
  }],
}, {
  usePushEach: true,
});

userSchema.plugin(sanitizeJson);
export default userSchema;
