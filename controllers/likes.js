const LikesService = require('../services/likes');

class LikesController {
  LikesService = new LikesService();

  getlikes = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      let userLikes = await this.LikesService.findAllLike(userId);

      res.status(200).json({ userLikes });
    } catch (err) {
      res.status(404).send(err);
    }
  };

  putLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const result = await this.LikesService.putLike(userId, postId);

      res.status(200).json({ result });
    } catch (err) {
      res.status(400).send(err);
    }
  };
}

module.exports = LikesController;
