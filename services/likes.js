const LikeRepository = require('../repositories/likes')

class LikeService {
  LikeRepository = new LikeRepository()

  findAllLike = async (userId) => {
    let userLikePosts = await this.LikeRepository.findUserLikePosts(userId)

    userLikePosts.sort((a, b) => b.createdAt - a.createdAt);
    userLikePosts.sort((a, b) => b.likes - a.likes);

    return userLikePosts
  }

  putLike = async (userId, postId) => {
    const result = await this.LikeRepository.putLike(userId, postId);
    return result;
  }
}



module.exports = LikeService;