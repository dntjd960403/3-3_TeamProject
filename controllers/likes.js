const LikesService = require('../services/likes');

class LikesController {
  LikesService = new LikesService();

  getlikes = async (req, res, next) => {
    const { userId } = res.locals.user;

    let userLikes = await this.LikesService.findAllLike(userId);

    res.status(200).json({ userLikes })
  }

  putLike = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const result = await this.LikesService.putLike(userId, postId)

    res.status(200).json({ result })
  }
}

module.exports = LikesController;