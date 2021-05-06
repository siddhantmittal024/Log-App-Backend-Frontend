const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired Token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error(
    'Login/SignUp to perform this function!! Authorization header should be provided!'
  );
};
