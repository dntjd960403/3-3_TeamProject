const supertest = require('supertest');
const app = require('../../app');
const {
  createUserInsert,
  createUserResult,
  loginUserInsert
} = require('../fixtures/CRUD.fixtures');

// jest.mock("../../models");
const { Users } = require('../../models');


// 테스트를 할 때마다 데이터가 생성되고 초기화되고 한다. 
// 회사 DB잘못 날려먹을 수 있기 때문에 진짜 진짜 조심해야한다.
// FIXME: 실제 Production 환경일 경우 매우 위험한 방법입니다.
//  해당 테스트를 하기 위해선 DBnom  연결 상태에 대해서 명확하게 파악을 한 이후 진행해주세요.
beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') await Users.sequelize.sync();
  else throw new Error('NODE_ENV가 test로 설정되어 있지 않습니다.');
}); //위험한 테스트기 때문에 초기화 하기 전에 DB가 test db인지 검사부터 하고 시작. 

describe('Users-users Domain의 통합테스트', () => {

  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test('POST localhost:3030/signup 최초 호출 시 Users 생성', async () => {

    const response = await supertest(app)
      .post('/signup')
      .send(createUserInsert);
    const responseByJson = JSON.parse(response.text);
    console.log(responseByJson)
    expect(response.status).toEqual(201);
    // 해당 Object에서 특정 인자가 포함되어있는지 검증합니다.
    expect(responseByJson.data).toMatchObject({ //입력받는 속성이 부족하더라도 있게끔 인식하고 무시하고 진행해준다
      userId: createUserResult.userId,
      nickname: createUserResult.nickname,
      // createdAt은 만들 때 내가 파악할 수 있는게 아니리 때문에 넣어주지 못한다. ㅅㅂ 그래서 투매치오브젝트 씀
    });
  });


  // test('POST localhost:3030/login 호출시 토큰 지급', async () => {
  //   const response = await supertest(app)
  //     .post('/login')
  //     .send(loginUserInsert);

  //   const responseByJson = JSON.parse(response.text);
  //   expect(response.status).toEqual(200);

  //   expect(responseByJson.result).toMatchObject({ //입력받는 속성이 부족하더라도 있게끔 인식하고 무시하고 진행해준다
  //     userId: createResult.userId,
  //     nickname: createUserResult.nickname,
  //     password: createUserResult.password,
  //   })
  // });

});

afterAll(async () => {
  await Users.sequelize.sync({ force: true });
});