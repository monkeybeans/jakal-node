import { Schema } from 'mongoose';
import connect from './connect';

const connection = connect();

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

const UserModel = connect().model('User', schema);

export default UserModel;
