const LikeService = require('../services/likes');

class LikesController {
  LikeService = new LikeService();

  getlikes = async (req, res, next) => {
    const { userId } = res.locals.user;

    let userLikes = await this.LikeService.findAllLike(userId);

    res.status(200).json({ userLikes })
  }

  putLike = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const result = await this.LikeService.putLike(userId, postId)

    res.status(200).json({ result })
  }
}

module.exports = LikesController;