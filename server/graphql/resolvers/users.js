const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const authCheck = require('../../utils/authCheck');
const { UserInputError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const {
  validateSignUpInput,
  validateLoginInput
} = require('../../utils/validator');

const validateUpdateUserData = (name, email, password) => {
  const errors = {};

  if (email != null) {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Not a valid email address!!';
    }
  }

  if (password === '') {
    errors.email = 'Enter Password!';
  }

  if (name === '') {
    errors.email = 'Enter name!';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
}

module.exports = {
  Query: {
    async getAllUsers(_, {}, context) {
      const user = authCheck(context);

      //const { offset, limit } = input;

      if (user.role === 'admin') {
        try {
          const users = await User.find().sort({ createdAt: -1 });
          return users;
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new Error('You do not have permission to perform this!!!');
      }
    },

    async getUser(_, { userId }, context) {
      const user = authCheck(context);
      //console.log(user);
      if (user.role === 'admin') {
        try {
          const user = await User.find({ _id: userId });
          return user;
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new Error('You do not have permission to perform this!!!');
      }
    }
  },

  Mutation: {
    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError('Error', { errors });
      }
      // Check if user with given email exist!
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError('User does not exists!!', {
          errors: {
            email: 'User with this email does not exist!'
          }
        });
      }
      //console.log(user);

      // Check if entered password is correct!
      const comparePasswords = await bcrypt.compare(password, user.password);

      if (!comparePasswords) {
        throw new UserInputError('Incorrect Password!!', {
          errors: {
            email: "Password entered isn't correct!! Try again."
          }
        });
      }

      const token = signToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },

    async signUp(
      _,
      { registerInput: { name, email, password, confirmPassword, role } }
    ) {
      // Validating User Data
      const { valid, errors } = validateSignUpInput(
        name,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Error', { errors });
      }
      // Check for user already exist
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('User already exists!!', {
          errors: {
            email: 'User with this email already exist!'
          }
        });
      }
      // Encrypting Password and JWT
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password,
        role,
        createdAt: new Date().toISOString()
      });
      const res = await newUser.save();
      const token = signToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },

    async updateUser(_, { _id, input }, context) {
      const user = authCheck(context);
      if (user.role === 'admin') {
        const { valid, errors } = validateUpdateUserData(
          input.name,
          input.email,
          input.password
        );
        if (!valid) {
          throw new UserInputError('Credential Error', { errors });
        }

        if (input.password != null) {
          if (input.password.length >= 8) {
            input.password = await bcrypt.hash(input.password, 12);
          } else {
            throw new UserInputError('Invalid Password!!');
          }
        }
        try {
          return await User.findOneAndUpdate({ _id }, input, { new: true });
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      } else {
        throw new Error('You do not have permission to perform this!!!');
      }
    }
  }
};

//TODO: IMPLEMENT PAGINATE!!! THEN START FRONTEND
