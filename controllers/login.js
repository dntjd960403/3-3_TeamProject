const LoginService = require('../services/login');
const Joi = require('joi');

const re_password = /^[a-zA-Z0-9]{4,30}$/;

const loginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

const passwordSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().pattern(re_password).required(),
  confirm: Joi.string(),
});

class LoginController {
  loginService = new LoginService();

  postLogin = async (req, res, next) => {
    try {
      let { nickname, password } = await loginSchema.validateAsync(req.body);

      const { token, expires } = await this.loginService.loginUser(nickname, password);

      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires });

      return res.status(200).json({ token });
    } catch (error) {
      if (error.code === -1) {
        res.status(401).send({ errorMessage: '닉네임 또는 패스워드가 틀렸습니다.' });
      } else {
        console.log(`${req.method} ${req.originalUrl} : ${error.msg}`);
        return res.status(401).send({
          errorMessage: '로그인에 실패하였습니다.',
        });
      }
    }
  };

  changePassword = async (req, res, next) => {
    try {
      let { nickname, password, confirm } = await passwordSchema.validateAsync(req.body);
      const findNickname = await this.loginService.findUser(nickname);

      if (!findNickname) {
        return res.status(412).send({ errorMessage: '닉네임을 확인해주세요.' });
      }

      if (password !== confirm) {
        return res.status(412).send({
          errorMessage: '패스워드 확인이 일치하지 않습니다.',
        });
      }

      if (password.search(nickname) !== -1) {
        return res.status(412).send({
          errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
        });
      }

      await this.loginService.changePassword(nickname, password);
      return res.status(200).json({ message: '비밀번호를 수정하였습니다링.' });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({
        errorMessage: '비밀번호 변경에 실패하였습니다.',
      });
    }
  };
}

module.exports = LoginController;
