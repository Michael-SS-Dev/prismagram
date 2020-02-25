import "./env";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  // Autuorization의 헤더에서 jwt를 찾는 역할
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 토큰을 암호화하기 위한 문자열 반드시 변수명 지켜줄 것!
  secretOrKey: process.env.JWT_SECRET
};

// JWT가 decrypt한 정보를 콜백할 함수
// payload 는 strategy에 의해 해석된 정보
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      // user를 찾은 경우
      return done(null, user);
    } else {
      // 못찾은 경우
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// path 보호를 위한 함수
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    // User가 존재한다
    if (user) {
      req.user = user;
    }
    // 존재하지 않는다면 그냥 넘긴다.
    next();
    // verifyUser에섯 사용자를 받아온 후에, 사용자가 존재한다면
    //그 사용자 정보를 req 객체에 붙여준다.
    // express를 미들웨어를 지나서 라우트가 실행된다.
    // 토큰을 받아서, 해석하고, 사용자를 찾고, 사용자가 존재할 때, req 객체에
    // 사용자를 추가하고 나서야 graphql함수가 실행된다.
    // 떼믄에 로그인 되어있는 경우 모든 graphql 함수 요청에 앞서 사용자 정보가 추가된다.
  })(req, res, next);
// passtport.auth~}) 까지가 하나의 Function을 리턴한다고 생각하면 된다.
// 해당 Function이 req res next를 인자로 하여 다시금 실행한다는 의미
// 여기서 실행되는 함수는 graphql 함수

//옵션이 잘 적용되었을때,  JwtStrategy 함수가 토큰을 decrypt할 것 그리고 그 정보를 콜백함수로 전달해준다.
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
