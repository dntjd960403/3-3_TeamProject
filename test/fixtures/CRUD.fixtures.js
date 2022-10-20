/** Users Controller Fixtures **/

// Users 관련된 모든 변수를 한곳에 보관하는 미친...여기서도 찾아봐야하는구나. ㅇ
exports.createUserInsert = {
  nickname: 'sparta',
  password: '1234',
  confirm: '1234'
};

exports.createUserResult = {
  userId: 1,
  nickname: 'sparta',
  password: '1234'
};

exports.loginUserInsert = {
  nickname: 'sparta',
  password: '1234'
};

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
};

// exports.findAllLikesResult = [ 회원가입해서 로그인한뒤 글한번 쓰고 GET하고 좋아요하고
//   {
//     dataValues: {
//       likeId: 1,
//       postId: 1,
//       userId: 1,
//       createdAt: '2022-10-20T01:09:32.000Z',
//       updatedAt: '2022-10-20T01:09:32.000Z'
//     }
//   }
// ];

exports.createPostsInsert = {
  userId: '1',
  title: '제목',
  content: '내용'
};

// /** Users Service Fixtures **/
// // Insert
// exports.createUserInsert = {
//   id: 'archepro85',
//   password: '1234',
//   nickname: '스파르타11',
//   gender: 'MAN',
// };

// // Result
// exports.createUserResult = {
//   createdAt: '2022-10-16T09:34:00.396Z',
//   updatedAt: '2022-10-16T09:34:00.397Z',
//   userId: 1,
//   id: 'archepro85',
//   password: '1234',
//   nickname: '스파르타11',
//   gender: 1,
// };

// /** Users Repository Fixtures **/
// exports.getUserByPkInsert = { userId: 1 };

// // UsersRepository.findUser Method를 사용하기 위한
// exports.findUserInsert = {
//   id: 'Archepro84',
//   nickname: 'spartaNickName',
// };

// // UsersRepository.createUser Method를 사용하기 위한
// exports.createUserInsertByRepository = {
//   id: 'archepro85',
//   password: '1234',
//   nickname: '스파르타11',
//   gender: 1,
// };
