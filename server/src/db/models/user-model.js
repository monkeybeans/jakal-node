import { Schema } from 'mongoose';
import connect from './connect';

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
  lasVoting: {
    type: Date,
    default: new Date(0)
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = connect().model('User', schema);

export default UserModel;
