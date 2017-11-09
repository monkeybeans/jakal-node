import { Schema } from 'mongoose';
import connect from './connect';

const schema = new Schema({
  username: {
    type: String,
    minLength: 2,
    maxLength: 25,
    match: new RegExp('^[\\w\\$\\*]{2,}$'),
    unique: true,
    required: true,
  },
  emails: {
    type: [{type:String, required: true}],
    required: true,
  },
  lasVoting: {
    type: Date,
    default: new Date(0)
  },
  password: {
    type: String,
    minLength: 40,
    required: true,
  },
  session: {
    type: String,
    default: null,
  }
});

const UserModel = connect().model('User', schema);

export default UserModel;
