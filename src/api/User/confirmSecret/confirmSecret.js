import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  // JWT 토큰을 리턴해주어야 하는 resolver
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });
        // JWT 토큰 생성
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
