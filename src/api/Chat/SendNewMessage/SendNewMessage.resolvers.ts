import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SendNewMessageMutationArgs,
  SendNewMessageResponse,
} from "../../../types/graph";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendNewMessage: privateResolver(
      async (
        _res,
        args: SendNewMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendNewMessageResponse> => {
        const { text, chatId, isSenderPassenger } = args;

        const chat = await Chat.findOne({ id: chatId });

        if (!chat) {
          return {
            ok: false,
            error: "chat-not-found",
            message: null,
          };
        } else {
          try {
            const sender = req.user;

            const message = await Message.create({
              text,
              chat,
              passenger: isSenderPassenger ? sender : null,
              driver: !isSenderPassenger ? sender : null,
            }).save();

            pubSub.publish("newChatMessage", {
              SubscribeNewMessage: message,
            });

            return {
              ok: true,
              error: null,
              message,
            };
          } catch (e) {
            return {
              ok: true,
              error: e.message,
              message: null,
            };
          }
        }
      }
    ),
  },
};

export default resolvers;
