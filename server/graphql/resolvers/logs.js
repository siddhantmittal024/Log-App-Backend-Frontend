const Logs = require('../../models/logsModel');
const { UserInputError } = require('apollo-server-express');
const authCheck = require('../../utils/authCheck');

const validateLogData = (phoneNumber) => {
  const errors = {};

  if (phoneNumber.length != 10) {
    errors.phoneNumber = 'PhoneNumber Should be 10digit Long!!';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports = {
  Query: {
    async getUserLogs(_, {}, context) {
      const user = authCheck(context);

      try {
        const logs = await Logs.find({ user: user.id }).sort({ createdAt: -1 });

        return logs;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createLog(_, { phoneNumber, text }, context) {
      const user = authCheck(context);
      const { valid, errors } = validateLogData(phoneNumber);
      if (!valid) {
        throw new UserInputError('Error', { errors });
      }

      //console.log(phoneNumber, text, context);

      //console.log(user);
      try {
        const newLog = new Logs({
          phoneNumber,
          text,
          user: user.id,
          createdAt: new Date().toISOString()
        });
        const log = await newLog.save();
        return log;
      } catch (err) {
        throw new UserInputError('Error:', err);
      }
    }
  }
};
