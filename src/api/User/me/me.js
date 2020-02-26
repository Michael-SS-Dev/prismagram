import { prisma } from "../../../../generated/prisma-client";

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
    // 왜 주석?
    //  me{
    //      user{
    //       fullName
    //     }
    // }
    // 위 graphql문이 가능한 이유는 me의 리턴 값 중 User type이 있기 때문이다.

    // 여기서 parent는 fullName Resolver를 콜하는 user이다. => userProfile
    // },
    // 아래의 의미는 graphql models의 type 중 User의 fulName 변수가 아래와 같이 정해지는 resolver를 정의한 것
    // API 내 js 중 한 곳에만 만들어도 작동함 따라서 computed.js 한 곳에 몰아서 만드는 것
    // User: {
    //   fullName: parent => {
    //     return `${parent.firstName} ${parent.lastName}`;
    //   }
  }
};
