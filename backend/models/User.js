const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  Department: {
    type: String,
    required: [true, 'Department is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  Age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
