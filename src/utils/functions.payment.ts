import request from "request";
import { PaymentResult, VerifyCreditResult } from "../types/graph";
import Ride from "../entities/Ride";
import Credit from "../entities/Credit";

const Authorization = process.env.IAMPORT_TOKEN;

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
  if(!ride.passenger) {
    return {
      ok:false,
      code:null,
      error:'passenger-not-found'
    }
  }

  const options = {
    uri: `https://api.iamport.kr/subscribe/customers/${ride.passenger.id}`,
    method: "POST",
    form: {
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
  console.log("\n\n\n\n\nResponse: ", response, "\n\n\n\n");

  if (response) {
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

export const verfyCredit = async(credit: Credit):Promise<VerifyCreditResult> => {
    


  const options={

  }
  
}
