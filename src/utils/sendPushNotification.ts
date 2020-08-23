import request from "request";
import dotenv from "dotenv";

dotenv.config();

const FIREBASE_KEY = process.env.FIREBASE_KEY;

const sendRequest = async (option: any) => {
  return new Promise((resolve, reject) => {
    request.post(option, (_err, res) => {
      console.log(res.body);
      resolve(res.body);
    });
  });
};

export const sendPushAndroid = async (
  to: string,
  title: string,
  body: string,
  nextView: string
) => {
  const options = {
    headers: {
      Authorization: `key=${FIREBASE_KEY}`,
      "Content-Type": "application/json",
    },
    uri: "https://fcm.googleapis.com/fcm/send",
    method: "POST",
    json: {
      to,
      notification: {
        title,
        body,
        content_available: true,
        priority: "high",
      },
      data: {
        nextView,
        title,
        body,
        content_available: true,
        priority: "high",
      },
    },
  };

  const sendPushResult = await sendRequest(options);

  return sendPushResult;
};
