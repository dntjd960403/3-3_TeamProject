// repositories/posts.repository.js
const { sequelize } = require('../models');
const { Sequelize } = require('../models');
const { Op } = Sequelize;
const { Posts, Likes } = require('../models');
// 좋아요를 찾아서 같이 넣어줄 때도 있기 때문에 Likes도 넣어준다. 

class PostsRepository {
  constructor() {
    this.Posts = Posts; 
    this.Likes = Likes;
  } // 모킹하기 위한 기본 과정. 바깥에서 진짜 Posts 데이터를 가져오는것을 방지하기 위해 클래스의 상속을 이용한다. 

  findAllPost = async () => {
    try {
      // 좋아요 가져오기
      const likes = await this.Likes.findAll(); // Likes -> this.Likes this.Likes는 테스트파일의 postsRepository.Posts 를 가리키게 된다. 

      //map을 쓰니까 const안될거 같아서 let씀
      let posts = await this.Posts.findAll({attributes: {exclude: ['content'],}}); 
      
      // 게시글에 좋아요 갯수 넣어주기
      posts = posts.map((post) => {
        return {
          ...post.dataValues,
          likes: likes.filter((like) => like.postId === post.postId).length,
        };
      });
      // 완성한 게시글 올려보내기
      return posts;

    } catch (err) {
      throw err
    }
  };

  createPost = async (userId, title, content) => {
    try {
      // 검사는 service에서 다 했음. 넣는 기능만
      const createPostData = await this.Posts.create({
        userId,
        title,
        content,
      });
      // 만든 게시글 내용 올려보내기
      return "게시글을 생성하였습니다.";

    } catch(err) {
      throw err
    }
  };

  findPostById = async (postId) => {
    try {
      // 일부러 기존거 안 쳐내고 그냥 이걸로 하는거임.
      const likes = await this.Likes.findAll({
        where: {
          [Op.and]: [{ postId }],
        },
      });
      
      let post = await this.Posts.findOne({ where: { postId } });

      if (post === undefined) throw { message: '게시글을 찾을 수 없습니다.' }
      return {
        ...post.dataValues,
        likes: likes.filter((like) => like.postId === post.postId).length,
      };

      return post;

    } catch (err) {
      throw err.message
    }
  };

  updatePost = async (userId, postId, title, content) => {
    try {
      const updatePostData = await this.Posts.update(
        { title, content },
        { where: { postId, userId } }
      );
      return updatePostData;

    } catch (err) {
      throw err
    }
  };

  deletePost = async (userId, postId) => {
    try {
      const deleteCount = await this.Posts.destroy({
        where: { userId, postId },
      });
      return deleteCount

    } catch (err) {
      throw err
    }
  };
}

module.exports = PostsRepository;

      // 전체 찾는 쿼리문 보존용..
      // const postQuery = `
      //           SELECT p.postId, u.userId, u.nickname, p.title, p.content, p.createdAt, p.updatedAt
      //           FROM Posts AS p
      //           JOIN Users AS u
      //           ON p.userId = u.userId
      //           WHERE p.postId = ${postId}
      //           ORDER BY p.postId DESC
      //           LIMIT 1`;

      // const post = await sequelize
      //   .query(postQuery, {
      //     type: Sequelize.QueryTypes.SELECT,
      //   })
      //   .then((posts) => {
      //     const post = posts[0];})

      // 상세 게시글 가져오기 쿼리문 보존용... 
      // const postsQuery = `
      //             SELECT p.postId, u.userId, u.nickname, p.title, p.createdAt, p.updatedAt
      //             FROM Posts AS p
      //             JOIN Users AS u
      //             ON p.userId = u.userId
      //             ORDER BY p.postId DESC`;

      // let posts = await sequelize.query(postsQuery, {
      //   type: Sequelize.QueryTypes.SELECT,
      // });