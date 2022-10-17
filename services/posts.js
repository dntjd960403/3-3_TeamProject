const PostRepository = require('../repositories/posts');
// 결국 sequelize 관련 require 는 repository에서 해야함..


class PostService {

  postRepository = new PostRepository();

  findAllPost = async () => {
    // 찾기 
    const allPost = await this.postRepository.findAllPost();
    // 정렬하기
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    //올려보내기
    return allPost;
  };

  createPost = async (userId, title, content) => {
    // 만들기
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );

    // 올려보내기
    return createPostData;
  };

  findPostById = async (postId) => {
    // 상세정보 찾기
    const findPost = await this.postRepository.findPostById(postId);

    // 찾은 정보 올리기
    return findPost;
  };

  updatePost = async (userId, postId, title, content) => {
    // 업데이트할 게시글 찾기
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) return "삭제된 게시물입니다.";
    if (userId !== findPost.userId) return "수정할 수 없는 게시물입니다.";
    // 수정하기 
    await this.postRepository.updatePost(userId, postId, title, content);

    const updatePost = await this.postRepository.findPostById(postId);
    return updatePost;
  };

  deletePost = async (userId, postId) => {
    // 삭제하기 전 게시글 찾아보기
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) return ("삭제된 게시물입니다.");
    if (userId !== findPost.userId) return "삭제할 수 없는 게시물입니다."
    // 삭제하기
    await this.postRepository.deletePost(userId, postId);
    return findPost;
  };
}


module.exports = PostService;