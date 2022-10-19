const PostsRepository = require('../repositories/posts');
// 결국 sequelize 관련 require 는 repository에서 해야함..


class PostsService {

  postsRepository = new PostsRepository();

  findAllPost = async () => {
    try {
      // 찾기 
      const allPost = await this.postsRepository.findAllPost();
      // 정렬하기
      allPost.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      //올려보내기
      return allPost;

    } catch (err) {
      throw err
    }
  };

  createPost = async (userId, title, content) => {
    try {
      // 만들기
      const createPostData = await this.postsRepository.createPost(
        userId,
        title,
        content
      );

      // 올려보내기
      return createPostData;

    } catch (err) {
      throw err
    }
  };

  findPostById = async (postId) => {
    try {
      // 상세정보 찾기
      const findPost = await this.postsRepository.findPostById(postId);

      // 찾은 정보 올리기
      return findPost;
    } catch (err) {
      throw err
    }
  };

  updatePost = async (userId, postId, title, content) => {
    try {
      // 업데이트할 게시글 찾기
      const findPost = await this.postsRepository.findPostById(postId);
      if (userId !== findPost.userId) throw { message: '수정할 수 없는 게시물입니다.' };
      // 수정하기 
      await this.postsRepository.updatePost(userId, postId, title, content);

      const updatePost = await this.postsRepository.findPostById(postId);
      return updatePost;

    } catch (err) {
      throw err
    }
  };

  deletePost = async (userId, postId) => {
    try {
      // 삭제하기 전 게시글 찾아보기
      const findPost = await this.postsRepository.findPostById(postId);
      if (!findPost) throw { message: "게시물을 찾을 수 없습니다." };
      if (userId !== findPost.userId) throw { message: "삭제할 수 없는 게시물입니다." }
      // 삭제하기
      await this.postsRepository.deletePost(userId, postId);
      return findPost;

    } catch (err) {
      throw err.message
    }
  };
}


module.exports = PostsService;