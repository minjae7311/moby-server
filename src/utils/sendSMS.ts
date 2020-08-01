// import Twilio from "twilio";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const NHN_KEY = process.env.NHN_KEY;
const NHN_SEND_NUMBER = process.env.NHN_SEND_NUMBER;

/**
 *
 *
 * @todo 카드에서 리퀘스트 하는거랑 해서 따로 빼기 -> 하면 안될듯. res 형태가 달라서..
 * @param option
 */
const sendRequest = async (option: any) => {
  return new Promise((resolve, reject) => {
    request.post(option, (_err, res) => {
      resolve(res.body.header);
    });
  });
};

/**
 * send any messages
 *
 * @param {string} to receiver
 * @param {string} smsBody body
 */
export const sendSMS = async (to: string, smsBody: string) => {
  console.log(NHN_KEY);
  console.log(NHN_SEND_NUMBER);

  const options = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    uri: `https://api-sms.cloud.toast.com/sms/v2.3/appKeys/${NHN_KEY}/sender/sms`,
    method: `POST`,
    json: {
      body: smsBody,
      sendNo: NHN_SEND_NUMBER,
      recipientList: [{ recipientNo: to }],
    }
  };
  const sendSMSResult = await sendRequest(options);
  console.log("\n\n\n\n\n", sendSMSResult);

  return sendSMSResult;
};

/**
 * send verification key with @function sendSMS()
 *
 * @param {string} to
 * @param {string} key
 */
export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `모비 - 인증번호는 [${key}] 입니다.`);
