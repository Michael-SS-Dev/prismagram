import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT, FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      // const post = await prisma.post({ id });
      // const comments = await prisma
      //   .post({ id })
      //   .comments()
      //   .$fragment(COMMENT_FRAGMENT);
      // const likeCount = await prisma
      //   .likesConnection({
      //     where: { post: { id } }
      //   })
      //   .aggregate()
      //   .count();
      // const files = await prisma.post({ id }).files();
      // const user = await prisma.post({ id }).user();
      // return {
      //   post,
      //   comments,
      //   likeCount,
      //   files,
      //   user
      // };
      // 위 내용 아래 한줄로 바꿀 수 있었던 이유, 바꿔야 하는 이유 => 리턴값이 graphql 파일에서 POST로 정해져 있는데 여러가지 객체를 리턴했기 때문
      return prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
    }
  }
};
