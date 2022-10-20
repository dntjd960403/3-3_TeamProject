/** PostsRepositoryFixtures **/

// NaverUsers 관련된 모든 변수를 한곳에 보관하는 미친...여기서도 찾아봐야하는구나. ㅇ
exports.findAllPostResult = [
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

exports.findOnePostResult =
{
  dataValues: {
    postId: 1,
    userId: 1,
    title: '테스트성공입니다구링~',
    content: '테스트 성공~',
    createdAt: '2022-10-19T15:38:36.000Z',
    updatedAt: '2022-10-19T15:38:36.000Z'
  }
}
  ;

exports.findAllLikesResult = [
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

exports.createPostsInsert = {
  userId: 1,
  title: '제목',
  content: '내용'
}; 