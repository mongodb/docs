import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true
  },
});

const User = model('User', userSchema);
export default User;
