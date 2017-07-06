module.exports = function asyncWrap (fn) {
  return (req, res, next) => {
    return fn(req, res).catch(next);
  };
}
