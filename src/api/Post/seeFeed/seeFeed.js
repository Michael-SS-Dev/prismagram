import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      // 팔로잉 내역 확인
      //console.log(following.map(user => user.id));
      return prisma.posts({
        where: {
          user: {
            // following하고 있는 모든 아이디와 유저 자신의 아이디
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
