const app = require('../app');
const supertest = require('supertest');

const signupUsersRepository = require('../repositories/signup');

const UsersModel = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

// Users.findOne = jest.fn();

test('비밀번호와 확인이 다를 때 412포트 반환 ', async () => {
  const res = await supertest(app)
    .post('/signup')
    .send({ nickname: 'aaa123', password: '1234', confirm: '12334' });
  expect(res.status).toEqual(412);
});
test('아이디 형식이 안맞을 시 400포트 반환', async () => {
  const res = await supertest(app)
    .post('/signup')
    .send({ nickname: 'aaa!123', password: '1234', confirm: '1234' });
  expect(res.status).toEqual(400);
});
test('비밀번호 형식이 안맞을 시 400포트 반환', async () => {
  const res = await supertest(app)
    .post('/signup')
    .send({ nickname: 'aaa123', password: '12!34', confirm: '12!34' });
  expect(res.status).toEqual(400);
});
test('비밀번호에 닉네임이 포함될 시 412포트 반환', async () => {
  const res = await supertest(app)
    .post('/signup')
    .send({ nickname: 'aaa', password: '12aaa34', confirm: '12aaa34' });
  expect(res.status).toEqual(412);
});
test('해당 닉네임이 있을 시 412포트 반환', async () => {
  const res = await supertest(app)
    .post('/signup')
    .send({ nickname: 'aaa123', password: '1234', confirm: '1234' });
  expect(res.status).toEqual(200);
});
test('', async () => {
  const res = await supertest(app)
    .post('/signup')
    .send({ nickname: 'aaa123', password: '1234', confirm: '1234' });
  let signupUser = new signupUsersRepository();
  signupUser.findOne = UsersModel();

  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  expect(signupUser.findOne).toHaveBeenCalledTimes(1);
});
