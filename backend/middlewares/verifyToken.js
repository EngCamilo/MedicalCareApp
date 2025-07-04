import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No autorizado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_temporal');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}
