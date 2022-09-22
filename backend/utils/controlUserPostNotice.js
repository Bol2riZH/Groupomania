'use strict';

exports.controlUserLiked = (post, req) => {
  const index = post.usersLiked.indexOf(req.auth.userId);
  if (index < 0) return false;
  else return index;
};

exports.controlUserDisliked = (post, req) => {
  const index = post.usersDisliked.indexOf(req.auth.userId);
  if (index < 0) return false;
  else return index;
};

exports.controlUserPostLikes = (post, req) => {
  return post.usersLiked.includes(req.auth.userId);
};

exports.controlUserPostDislikes = (post, req) => {
  return post.usersDisliked.includes(req.auth.userId);
};
