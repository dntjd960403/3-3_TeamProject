const { sequelize } = require('../models');
const { Sequelize } = require('../models');
const { Op } = Sequelize;
const { Posts, Likes } = require('../models');

class LikeRepository {

  findUserLikePosts = async (userId) => {
    let userLikes = await Likes.findAll({
      where: { userId },
    });

    let likePostIdArray = getLikePostIdByLikes(userLikes);

    const postsQuery = `
              SELECT p.postId, u.userId, u.nickname, p.title, p.createdAt, p.updatedAt
              FROM Posts AS p
              JOIN Users AS u
              ON p.userId = u.userId
              ORDER BY p.postId DESC`;

    let posts = await sequelize
      .query(postsQuery, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((posts) => getPostsByPostIdArray(likePostIdArray, posts));

    const likes = await Likes.findAll();

    posts = posts.map((post) => {
      return {
        ...post,
        likes: likes.filter((like) => like.postId === post.postId).length,
      };
    });
    return posts
  }


  putLike = async (userId, postId) => {
    const isExist = await Posts.findByPk(postId);

    if (!isExist) {
      return ('게시글이 존재하지 않습니다.');
    }

    let isLike = await Likes.findOne({
      where: { postId, userId },
    });

    if (!isLike) {
      await Likes.create({ postId, userId });

      return ('게시글의 좋아요를 등록하였습니다.');
    } else {
      await Likes.destroy({
        where: { postId, userId },
      });

      return ('게시글의 좋아요를 취소하였습니다.');
    }
  }
}

function getLikePostIdByLikes(likes) {
  let likePostIdArray = [];
  for (const like of likes) {
    likePostIdArray.push(like.postId);
  }

  return likePostIdArray;
}
function getPostsByPostIdArray(postIdArray, posts) {
  return posts.filter((post) => {
    return postIdArray.includes(post.postId);
  });
}
module.exports = LikeRepository;