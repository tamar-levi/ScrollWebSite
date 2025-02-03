const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  additionalPhoneNumber: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  city: {
    type: String,
    required: true
  },
  isSeller: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('email')) {
    const existingUser = await User.findOne({ email: this.email });
    if (existingUser) {
      return next(new Error('Email already exists'));
    }
  }

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
