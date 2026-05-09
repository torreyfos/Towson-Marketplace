const jwt = require('jsonwebtoken');

const tokenAuth = function (req, res, next) {
  
  //get the header from the request
  const {authorization} = req.headers

  //checks to see if the header was sent
  if (!authorization) {
    return res.status(401).json({message: "No header found"})
  }

  //extract token from header
  const token = authorization.split(" ")[1];

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    //req.user stores the user document id for the current user
    req.user = decoded;
    next();

  } catch (err) {

    res.status(401).json({ message: "Invalid Token"});
  }
}

module.exports = tokenAuth;
