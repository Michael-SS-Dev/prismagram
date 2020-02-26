import { prisma } from "../../../generated/prisma-client";

// computed의 역할? 기존 디비에 있는 칼럼들의 조합으로 새로운 컬럼을 완성시키는 것
export default {
  // 아래의 의미는 graphql models의 type 중 User의 fulName 변수가 아래와 같이 정해지는 resolver를 정의한 것
  // API 내 js 중 한 곳에만 만들어도 작동함 따라서 computed.js 한 곳에 몰아서 만드는 것
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        // 왜 주석?
        // const exists = await prisma.$exists.user({
        //   AND: [{ id: parentId }, { followers_some: [user.id] }]
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
        // console.log(exists);
        // if (exists) {
        //   return true;
        // } else {
        //   return false;
        // }
      } catch {
        return false;
      }
    },
    // itsMe
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
    //   },
    //   // 추가 목적 : 해당 포스트에 접속한 유저의 아이디와 포스트의 아이디를 pk로 하는 like 객체가 존재하면 true 리턴
    //   Post: {
    //     isLiked: (parent, _, { request }) => {
    //       const { user } = request;
    //       const { id } = parent;
    //       return prisma.$exists.like({
    //         AND: [
    //           {
    //             user: {
    //               id: user.id
    //             }
    //           },
    //           {
    //             post: {
    //               id
    //             }
    //           }
    //         ]
    //       });
    //     }
    // 삭제 이유 : POST 폴더 아래 새로 만듦 복붙해서
  }
};
