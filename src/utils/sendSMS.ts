// import Twilio from "twilio";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const NHN_KEY = process.env.NHN_KEY;
const NHN_SEND_NUMBER = process.env.NHN_SEND_NUMBER;

/**
 *
 *
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
    },
  };
  const sendSMSResult = await sendRequest(options);

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
