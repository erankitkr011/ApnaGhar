const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
 // console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'ehgjfdjh1234');
    req.user = decoded;
    //console.log(req.user)
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = { checkUser };