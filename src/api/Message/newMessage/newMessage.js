import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          })
          .node();
        // node를 받아주어야 한다.
        // node로 받아주지 않는 경우, message로 리턴이 불가능함
      },
      // 변경된 payload 반영
      // payload의 경우 message type 뿐 아니라 Mutation Type, String 배열 type 등 다른 타입도 가지고 있음
      // 즉 리턴 값이 다양하고, 그 중 node를 취사 선택해야 한다는 의미(Message 리턴하고 싶으면)
      resolve: payload => payload
    }
  }
};
