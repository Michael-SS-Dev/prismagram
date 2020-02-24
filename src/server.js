require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

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
const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server is running from ${PORT}`)
);
