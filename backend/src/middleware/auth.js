const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

module.exports = function(req, res, next) {
  const autHeader = req.headers.authorization;
  if(!autHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const parts = autHeader.split(' ');
  if(parts.length !== 2) return res.status(401).json({ message: 'Formato invalido' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};