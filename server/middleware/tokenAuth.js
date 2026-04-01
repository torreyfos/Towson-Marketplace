const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  
 //get token from header
 const token = req.header('Authorization')?.replace('Bearer ', '');

  //check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = decoded; // {_id: ...}
    next();

  } catch (err) {

    res.status(401).json({ message: "Invalid Token"});
  }
};
