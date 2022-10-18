const LikesRepository = require('../repositories/likes')

class LikesService {
  LikesRepository = new LikesRepository()

  findAllLike = async (userId) => {
    let userLikePosts = await this.LikesRepository.findUserLikePosts(userId)

    userLikePosts.sort((a, b) => b.createdAt - a.createdAt);
    userLikePosts.sort((a, b) => b.likes - a.likes);

    return userLikePosts
  }

  putLike = async (userId, postId) => {
    const result = await this.LikesRepository.putLike(userId, postId);
    return result;
  }
}



module.exports = LikesService;