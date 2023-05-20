import jwt from 'jsonwebtoken';

const secret =  process.env.SECRET || 'your-secret-key';

const isAdmin = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials provided' });
    }

    const tokenBearer = req.headers.authorization;
    const token = tokenBearer.replace(/^Bearer\s+/, "");
    const tokenPayload = jwt.decode(token) as { user: { role: string } };

    try {
        jwt.verify(token, secret);
        if (tokenPayload.user.role !== "Admin") {
            throw new Error("Obligatoire");
        }
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
    next();
};

export default async function isAdminMiddleware(req, res, next) {
    return isAdmin(req, res, next);
}
