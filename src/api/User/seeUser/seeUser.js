import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    // 사용자 검색은 로그인 안한 상태에서도 진행하므로, isAuthenticated 사용하지 않는다.
    seeUser: async (_, args) => {
      const { id } = args;
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      return {
        user,
        posts
      };
    }
  }
};
