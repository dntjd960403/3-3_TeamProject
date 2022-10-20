const PostsRepository = require('../../../repositories/posts');

// fixture는 일단 여기 만들어놓고 이주를 시키든가 해야지 씨잇팟

const mockPostsModel = () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
});


test('hehe', () => {
  expect(1 + 1).toBe(2);
});
//오예 테스트 통과 기모찌~~~ 
// 테스트하는 명령어 npm test PostsRepository.spec

describe("posts repo쪽 단위테스트 입니당", () => {
  let postsRepository = new PostsRepository();
  postsRepository.Posts.create
})