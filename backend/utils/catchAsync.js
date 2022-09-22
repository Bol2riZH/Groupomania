'use strict';

// Snippet to get the try catch //
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return res.status(500).json({ status: 'fail', message: err });
    });
  };
};
