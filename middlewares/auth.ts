const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

module.exports = async function(req, res, next) {
  return jwtAuth(req, res, next);
}

async function jwtAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials provided' });
  }

  const tokenBearer = req.headers.authorization;
  const token = tokenBearer.replace(/^Bearer\s+/, "");

  try {
    jwt.verify(token, secret);
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
  next();
}
