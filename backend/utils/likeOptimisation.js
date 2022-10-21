exports.likesFields = (req, res, next) => {
  let likeField = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

  if (likeField === 1) {
    Sauce.updateOne(
      { _id: sauceId },
      { $push: { usersLiked: userId }, $inc: { likes: +1 } }
    )
      .then(() => res.status(200).json({ message: `J'aime` }))
      .catch((error) => res.status(400).json({ error }));
  } else if (likeField === -1) {
    Sauce.updateOne(
      { _id: sauceId },
      { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
    )
      .then(() => res.status(200).json({ message: "Je n'aime pas !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() => {
              res
                .status(200)
                .json({ message: "Le j'aime a bien été supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() => {
              res
                .status(200)
                .json({ message: "Le je n'aime pas a bien été supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
