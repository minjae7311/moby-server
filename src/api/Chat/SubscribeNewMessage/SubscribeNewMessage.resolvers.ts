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

          const currentChat = await Chat.findOne(
            { id: chat.id },
            { relations: ["passenger", "driver"] }
          );

          try {
            if (currentChat) {
              return (
                currentChat.passenger.id == user.id ||
                currentChat.driver.id == driver.id
              );
            } else {
              return false;
            }
          } catch (e) {
            return false;
          }
        }
      ),
    },
  },
};
export default resolvers;
