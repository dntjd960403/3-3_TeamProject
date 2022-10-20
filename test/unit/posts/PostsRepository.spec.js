const PostsRepository = require('../../../repositories/posts');

// fixture는 일단 여기 만들어놓고 이주를 시키든가 해야지 씨잇팟

const mockPostsModel = () => ({
  findAll: jest.fn(),
  findOnd: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  map: jest.fn()
});

const mockLikesModel = () => ({
  findAll: jest.fn()
})
// mock 모델을 이렇게 만든 이유는 무엇일까? 그냥 한꺼번에 하려고 그런거 아닌가?

test('hehe', () => {
  expect(1 + 1).toBe(2);
});
//오예 테스트 통과 기모찌~~~ 
// 테스트하는 명령어 npm test PostsRepository.spec

describe("posts repo쪽 단위테스트 입니당", () => {
  let postsRepository = new PostsRepository();
  postsRepository.Posts = mockPostsModel();
  postsRepository.Likes = mockLikesModel();
  beforeEach(() => {
    jest.resetAllMocks(); //철자주의
  });

  test('findAllPost 의 findAll 두개가 잘 뽑혀오는지 테스트', async () => {
    const findAllPostResult =
      [
        {
          dataValues: {
            postId: 1,
            userId: 1,
            title: '테스트성공입니다구링~',
            createdAt: '2022-10-19T15:38:36.000Z',
            updatedAt: '2022-10-19T15:38:36.000Z'
          }
        }
      ];
    postsRepository.Posts.findAll = jest.fn(() => {
      return findAllPostResult;
    });
    const findAllLikesResult =
      [
        {
          dataValues: {
            likeId: 1,
            postId: 1,
            userId: 1,
            createdAt: '2022-10-20T01:09:32.000Z',
            updatedAt: '2022-10-20T01:09:32.000Z'
          }
        }
      ];
    postsRepository.Likes.findAll = jest.fn(() => {
      return findAllLikesResult;
    })

    const postlist = await postsRepository.findAllPost({});

    expect(postsRepository.Posts.findAll).toHaveBeenCalledTimes(1);
    expect(postsRepository.Likes.findAll).toHaveBeenCalledTimes(1);
    // Matcher error: received value must be a mock or spy function ????
    // expect(postsRepository.Posts.findAll({ attributes: { exclude: ['content'], } })[0].dataValues.postId).toEqual(1);
    // 이거 되네ㅋㅋㅋㅋ 
    expect(postsRepository.Posts.findAll).toHaveBeenCalledWith(); // 처음에안됐는데 분명..????
    expect(postsRepository.Likes.findAll).toHaveBeenCalledWith();
    expect(postlist).toEqual([{
      postId: 1,
      userId: 1,
      title: '테스트성공입니다구링~',
      createdAt: '2022-10-19T15:38:36.000Z',
      updatedAt: '2022-10-19T15:38:36.000Z',
      likes: 1
    }]);
  });
})