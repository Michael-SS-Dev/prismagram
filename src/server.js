import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

//import { sendSecretMail, generateSecret } from "./utils";

//sendSecretMail("michael.ss.dev@gmail.com", generateSecret());

const PORT = process.env.PORT || 4000;

//schema에 개별적인 typeDef와 resolver들을 모두 합쳤기에 가능함

// const typeDefs = `
//     type Query{
//         hello: String!
//     }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "Hi"
//   }
// };

// graphql은 express를 포괄함
// const server = new GraphQLServer({ typeDefs, resolvers });
const server = new GraphQLServer({
  schema,
  // 우리가 사용하는 resolver들에게 Passport를 인식하게 하기 위함
  // context는 resolver 들끼리 정보를 공유하도록 하는 역할
  // context에는 함수도 담을 수 있다.
  // express의 request 객체를 공유한다.
  context: ({ request }) => ({ request })
  // 아래와 같은 http header를 추가해주지 않으면 request.user를 불러올 수 없다.
  //{ "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrNzBoY2F3emxjemEwYjAweXE2cTZ0bGsiLCJpYXQiOjE1ODI2MzYwODN9.Jyy4yIvgmOm328-BfJ80fJV6rv_T1UA4EZIqipGhoe8" }
});

server.express.use(logger("dev"));

// path 보호를 위해 사용
// passport.js 에서 import하여 사용
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server is running from ${PORT}`)
);
