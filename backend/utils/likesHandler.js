'use strict';

const catchAsync = require('../utils/catchAsync');

exports.likeHandler = catchAsync(async (req, res, Data) => {
  const stateLike = +req.body.like;
  const userId = req.auth.userId;
  const dataId = req.params.id;

  if (stateLike === 0) {
    await Data.updateOne(
      { _id: dataId, usersLiked: { $eq: userId } },
      { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
    );
    return res
      .status(200)
      .json({ status: 'success', message: 'like removed', stateLike });
  }
  if (stateLike === 1) {
    await Data.updateOne(
      { _id: dataId, usersLiked: { $ne: userId } },
      { $push: { usersLiked: userId }, $inc: { likes: +1 } }
    );
    return res
      .status(200)
      .json({ status: 'success', message: 'like added', stateLike });
  } else
    return res.status(400).json({
      status: 'fail',
      message: 'bad request',
    });
});
