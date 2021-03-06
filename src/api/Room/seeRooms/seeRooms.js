import { prisma } from "../../../../generated/prisma-client";
//import { ROOM_FRAGMENT } from "../../../fragments";
//Fragment 제거 ***

export default {
  Query: {
    seeRooms: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      //   return prisma.rooms({
      //     where: {
      //       participants_some: {
      //         id: user.id
      // 바꿀 수 있었던 이유
      // return prisma
      //   .rooms({
      //     where: {
      //       participants_some: {
      //         id: user.id
      //       }
      //     }
      //     //     }
      //     //   });
      //   })
      //   .$fragment(ROOM_FRAGMENT);
      // ** fragment 제거
      return prisma.rooms({
        where: {
          participants_some: {
            id: user.id
          }
        }
      });
    }
  }
};
