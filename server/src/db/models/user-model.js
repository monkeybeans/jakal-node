import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  emails: {
    type: [String],
    required: true,
  },
  password: String,
});

schema.methods.add = (name, emails, password) => {
  this.name = name;
  this.emails = emails;
  this.password = password;

  return this.save();
}

const Model = mongoose.model('User', schema);

export default Model;
