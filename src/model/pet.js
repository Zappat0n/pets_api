import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const { Schema } = mongoose;

const petSchema = new Schema({
  name: String,
});

petSchema.plugin(sanitizeJson);
export default petSchema;
