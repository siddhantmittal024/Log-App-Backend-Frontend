const userResolvers = require('./users');
const logResolvers = require('./logs');

module.exports = {
  Query: {
    ...logResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...logResolvers.Mutation
  }
};
