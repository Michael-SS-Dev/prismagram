import { prisma } from "../../../../generated/prisma-client";

//상수값으로 정의함으로써 좀더 안전하게~
const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      //현재 접속중인 request.user의 id와 post 작성자의 id가 같고, args로 입력된 POST의 id와 같은 post 객체가 있으면 true 리턴
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        // action은 graphql 에 enum값으로 정의해서 값을 한정시킬 것
        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
