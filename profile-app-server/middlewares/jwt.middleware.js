const { expressjwt } = require('express-jwt');

// Instantiate the JWT token validation middleware
const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  // requestProperty: 'pizza',
  getToken: getTokenFromHeaders,
});

// Function used to extracts the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNhMzVkNDUzY2IzYzJlMTU3NTBkOTUiLCJpYXQiOjE2OTA5Nzg0MDUsImV4cCI6MTY5MTAwMDAwNX0.JIEW6x1ZSBiAdpNhxyB5O9Y2S68bl38fvxGfM3Bp3NU"
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return null;
}

// Export the middleware so that we can use it to create a protected routes
module.exports = {
  isAuthenticated,
};
