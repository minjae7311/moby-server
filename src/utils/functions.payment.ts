import request from "request";
import { PaymentResult, VerifyCreditResult } from "../types/graph";
import Ride from "../entities/Ride";
import Credit from "../entities/Credit";

import dotenv from "dotenv";
dotenv.config();

const sendRequest = async (option: any) => {
  return new Promise((resolve, reject) => {
    request.post(option, (_err, res) => {
      resolve(JSON.parse(res.body));
    });
  });
};

/**
 *
 * @param {Ride} ride should have passenger info
 */
export const requestPayment = async (ride: Ride): Promise<PaymentResult> => {
  if (!ride.passenger) {
    return {
      ok: false,
      code: null,
      error: "passenger-not-found",
    };
  }

  const authResponse: any = await sendRequest({
    uri:
      "https://api.iamport.kr/users/getToken?_token=c5a7e9d6c61d977673ca3073d26ce8301984436d",
    method: "POST",
    form: {
      imp_key: process.env.IAMPORT_KEY,
      imp_secret: process.env.IAMPORT_SECRET,
    },
  });
  const Authorization = authResponse.response.access_token;

  const options = {
    uri: `https://api.iamport.kr/subscribe/again`,
    method: "POST",
    form: {
      customer_uid: ride.passenger.id,
      card_number: "377988064432611",
      expiry: "2024-12",
      birth: "930427",
      pwd_2digit: "87",
      merchant_uid: ride.finalFee,
      amount: 1,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const response: any = await sendRequest(options);

  if (response.code == 0) {
    return {
      ok: true,
      code: response.code,
      error: null,
    };
  } else {
    return {
      ok: true,
      code: response.code,
      error: response.message,
    };
  }
};

/**
 *
 * @param {Credit} credit
 */
export const verifyCredit = async (
  credit: Credit
): Promise<VerifyCreditResult> => {
  /**
   * @todo make this as function
   */
  const authResponse: any = await sendRequest({
    uri:
      "https://api.iamport.kr/users/getToken?_token=c5a7e9d6c61d977673ca3073d26ce8301984436d",
    method: "POST",
    form: {
      imp_key: process.env.IAMPORT_KEY,
      imp_secret: process.env.IAMPORT_SECRET,
    },
  });

  const Authorization = authResponse.response.access_token;

  const { card_number, expiry, pwd_2digit } = credit;
  const birth = credit.user.birthDate;

  if (!card_number || !expiry || !pwd_2digit) {
    return {
      ok: false,
      error: "empty-infos",
      code: null,
      credit: null,
    };
  }

  const options = {
    uri: `https://api.iamport.kr/subscribe/customers/${credit.user.id}`,
    method: "POST",
    form: {
      card_number,
      expiry,
      birth,
      pwd_2digit,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };

  const response: any = await sendRequest(options);

  if (response.code == 0) {
    credit.nickname = credit.nickname
      ? credit.nickname
      : response.response.card_name;
    credit.card_name = response.response.card_name;

    const newCredit = await credit.save();

    return {
      ok: true,
      error: null,
      code: response.code,
      credit: newCredit,
    };
  } else {
    return {
      ok: false,
      error: response.message,
      code: response.code,
      credit: null,
    };
  }
};
