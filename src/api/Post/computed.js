import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        // 해당 포스트 id에 연결되어있는 모든 like 객체들의 개수를
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        // 모아서
        .aggregate()
        // 갯수를 세서 리턴
        .count()
  }
};
