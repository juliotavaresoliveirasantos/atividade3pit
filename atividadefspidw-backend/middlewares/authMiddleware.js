// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Formato do token inválido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido.' });

    req.userId = decoded.id;  // Adiciona o ID do usuário ao objeto `req`
    next();  // Passa para a próxima função
  });
};

module.exports = { verificarToken };
