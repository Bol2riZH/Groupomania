'use strict';

exports.controlUserLiked = (post, id) => {
  const index = post.usersLiked.indexOf(id);
  if (index < 0) return false;
  else return index;
};

exports.controlUserDisliked = (post, id) => {
  const index = post.usersDisliked.indexOf(id);
  if (index < 0) return false;
  else return index;
};

exports.controlUserPostLikes = (post, id) => {
  return post.usersLiked.includes(id);
};

exports.controlUserPostDislikes = (post, id) => {
  return post.usersDisliked.includes(id);
};
