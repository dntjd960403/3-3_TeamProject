const LikesRepository = require('../repositories/likes')

class LikesService {
  LikesRepository = new LikesRepository()

  findAllLike = async (userId) => {
    try {
      let userLikePosts = await this.LikesRepository.findUserLikePosts(userId)

      userLikePosts.sort((a, b) => b.createdAt - a.createdAt);
      userLikePosts.sort((a, b) => b.likes - a.likes);

      return userLikePosts

    } catch (err) {
      throw err
    }
  }

  putLike = async (userId, postId) => {
    try {
      const result = await this.LikesRepository.putLike(userId, postId);
      return result;

    } catch (err) {
      throw err
    }
  }
}



module.exports = LikesService;