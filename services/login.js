const LoginRepository = require('../repositories/login')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;

class LoginService {
    loginRepository = new LoginRepository()

    /* 
        1. 클라이언트로부터 body를 통해 nickname, password를 받아온다.
        2. nickname과 password의 유효성 검사를 한다.
        3. 클라이언트로부터 받은 nickname이 db에 저장돼 있는지 확인
            3.1 있으면 통과, 없으면 412코드로 결과를 보낸다.
        4. 해당 유저가 입력한 패스워드가 일치한지 확인.
        5. expire 타임을 만들어 준다.
        6. 토큰을 만들기 위해 jwt 라이브러리를 사용해 유저 아이디와 secret키를 이용하여 사이닝한다.
        7. 객체에 토큰과 expires를 담아서 리턴 해준다.
    */
    loginUser = async (nickname, password) => {
        const loginUser = await this.loginRepository.findUser(nickname)

        if (!loginUser) throw {code:-1}

        const match = bcrypt.compareSync(password, loginUser.password);
    
        if (match) {
            const token = jwt.sign({ userId: loginUser.userId }, process.env.SECRET_KEY)
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 60);
            return {token: token, expires: expires,}
        } else {
            throw {code:-1}
        }
    }

    changePassword = async (nickname, password) => {
        const salt = bcrypt.genSaltSync(saltRounds);
        password = await bcrypt.hash(password, salt);
        
        await this.loginRepository.changePassword(nickname, password)
    }
}

module.exports = LoginService