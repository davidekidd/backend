module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if(token === process.env.EncryptionKey){
    next();
  } else {
    res.status(401).json({ 
      message: "You are not authorized to access.",
      messageId: 401
    });
  }
};