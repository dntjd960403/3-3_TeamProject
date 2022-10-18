// repositories/posts.repository.js
const { sequelize } = require('../models');
const { Sequelize } = require('../models');
const { Op } = Sequelize;
const { Posts, Likes } = require('../models');
// 좋아요를 찾아서 같이 넣어줄 때도 있기 때문에 Likes도 넣어준다. 

class PostsRepository {
  findAllPost = async () => {
    // 좋아요 가져오기
    const likes = await Likes.findAll();
    // 게시글 가져오기
    const postsQuery = `
                SELECT p.postId, u.userId, u.nickname, p.title, p.createdAt, p.updatedAt
                FROM Posts AS p
                JOIN Users AS u
                ON p.userId = u.userId
                ORDER BY p.postId DESC`;

    let posts = await sequelize.query(postsQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    // 게시글에 좋아요 갯수 넣어주기
    posts = posts.map((post) => {
      return {
        ...post,
        likes: likes.filter((like) => like.postId === post.postId).length,
      };
    });

    // 완성한 게시글 올려보내기
    return posts;
  };

  createPost = async (userId, title, content) => {
    // 검사는 service에서 다 했음. 넣는 기능만
    const createPostData = await Posts.create({
      userId,
      title,
      content,
    });
    // 만든 게시글 내용 올려보내기
    return "게시물을 생성하였습니다.";
  };

  findPostById = async (postId) => {
    // 일부러 기존거 안 쳐내고 그냥 이걸로 하는거임.
    const likes = await Likes.findAll({
      where: {
        [Op.and]: [{ postId }],
      },
    });

    const postQuery = `
              SELECT p.postId, u.userId, u.nickname, p.title, p.content, p.createdAt, p.updatedAt
              FROM Posts AS p
              JOIN Users AS u
              ON p.userId = u.userId
              WHERE p.postId = ${postId}
              ORDER BY p.postId DESC
              LIMIT 1`;

    const post = await sequelize
      .query(postQuery, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((posts) => {
        const post = posts[0];

        return {
          ...post,
          likes: likes.filter((like) => like.postId === post.postId).length,
        };
      });

    return post;
  };

  updatePost = async (userId, postId, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId, userId } }
    );
    return updatePostData;
  };

  deletePost = async (userId, postId) => {
    const deleteCount = await Posts.destroy({
      where: { userId, postId },
    });
    return deleteCount
  };
}

module.exports = PostsRepository;