import { withFilter } from "graphql-yoga";
import Driver from "../../../entities/Driver";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers = {
  Subscription: {
    SubscribeNewMessage: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
        async (payload, __args, { context }) => {
          const user: User = context.currentUser;
          const driver: Driver = context.currentDriver;
          const {
            SubscribeNewMessage: { chat },
          } = payload;

          console.log(payload);

          const currentChat = await Chat.findOne(
            { id: chat.id },
            { relations: ["passenger", "driver"] }
          );
          console.log(currentChat);

          try {
            if (currentChat) {
              return (
                currentChat.passenger.id == user.id ||
                currentChat.driver.id == driver.id
              );
            } else {
              console.log("\n\n\n\nchat not found");
              return false;
            }
          } catch (e) {
            console.log(e.message);
            return false;
          }
        }
      ),
    },
  },
};
export default resolvers;
