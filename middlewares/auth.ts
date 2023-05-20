import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'your-secret-key';

const jwtAuth = async (req, res, next) => {
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
};

export default async function jwtAuthMiddleware(req, res, next) {
  return jwtAuth(req, res, next);
}
