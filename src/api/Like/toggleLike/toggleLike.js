import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        // 특정 조건에 맞는 데이터가 있는지 확인하는 boolean 값 리턴
        const existingLike = await prisma.$exists.like(filterOptions);
        // like가 이미 있으면 지움
        if (existingLike) {
          // deleteManyLikes 가 아닌 deleteLike는 하나의 옵션만 적용 가능해서 ManyLikes 사용해줌
          await prisma.deleteManyLikes(filterOptions);
        } else {
          // 없으면 like를 만들어줌
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
