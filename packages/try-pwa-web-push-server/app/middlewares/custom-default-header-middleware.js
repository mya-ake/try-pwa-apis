const customDefaultHeaderMiddleware = (req, res, next) => {
  res.removeHeader('x-powered-by');
  res.header('x-xss-protection', '1; mode=block');
  res.header('x-frame-options', 'DENY');
  res.header('x-content-type-options', 'nosniff');
  next();
};

module.exports = {
  customDefaultHeaderMiddleware,
};
