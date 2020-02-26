import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    // _는 변수의 이름이 될 수 있다.
    // __ double underscore는 부모의 args를 뜻한다.
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      return {
        // 이름 같아서 충돌나는 것을 방지
        user: userProfile,
        posts
      };
    }
  }
};
