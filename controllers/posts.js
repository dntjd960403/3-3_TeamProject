const PostsService = require('../services/posts');
const Joi = require('joi');
// 다루는게 class 하나뿐이기 때문에 필요한건 require과 joi뿐임
// module.exports 하는것도 PostsController 클래스 뿐임. 

const RE_TITLE = /^[a-zA-Z0-9\s\S]{1,40}$/; //게시글 제목 정규 표현식
const RE_CONTENT = /^[\s\S]{1,3000}$/; // 게시글 내용 정규 표현식

const postsSchema = Joi.object({
  title: Joi.string().pattern(RE_TITLE).required(),
  content: Joi.string().pattern(RE_CONTENT).required(),
});



// 이곳에서 하는 일
// joi 벨리데이션 합니다.
// req 로 오는 데이터들을 받아 파라미터로 넘겨줍니다.
// res.local.uesr 에서 오는 userId 도 여기서 받아 파라미터로 넘겨줍니다.
class PostsController {
  postsService = new PostsService();


  getPosts = async (req, res, next) => {
    try {
      const result = await this.postsService.findAllPost();

      res.status(200).json({ message: result });

    } catch (err) {
      res.status(404).send(err)
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const result = await this.postsService.findPostById(postId);

      res.status(200).json({ message: result });

    } catch (err) {
      res.status(400).send(err)
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = await postsSchema.validateAsync(req.body); // 게시글 생성할 때 joi 검사 한번.

      const result = await this.postsService.createPost(
        userId,
        title,
        content
      );
      res.status(201).json({ message: result });

    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = await postsSchema.validateAsync(req.body);

      const result = await this.postsService.updatePost(
        userId,
        postId,
        title,
        content
      );

      res.status(200).json({ message: result });

    } catch (err) {
      res.status(400).send(err)
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      // 비밀번호는 authMiddleware를 통해 전할 수 있기 때문에 뺐음.
      const result = await this.postsService.deletePost(userId, postId);

      res.status(200).json({ message: result });

    } catch (err) {
      res.status(400).send(err)
    }
  };
}

module.exports = PostsController;