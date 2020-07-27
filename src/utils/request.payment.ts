import request from "request";
import { PaymentResult } from "../types/graph";
import Ride from "../entities/Ride";

const Authorization = process.env.IAMPORT_TOKEN;

const sendRequest = async (option: any) => {
  return new Promise((resolve, reject) => {
    request.post(option, (_err, res) => {
      resolve(JSON.parse(res.body));
    });
  });
};

export const requestPayment = async (ride: Ride): Promise<PaymentResult> => {
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
  /**
   * @todo response code 처리
   * 
   * 
   * Response:  {
  code: 0,
  message: null,
  response: {
    card_code: '381',
    card_name: '국민KB카드',
    card_number: '52728927****2305',
    card_type: 1,
    customer_addr: null,
    customer_email: null,
    customer_name: null,
    customer_postcode: null,
    customer_tel: null,
    customer_uid: '68',
    inserted: 1595843345,
    pg_id: 'nictest04m',
    pg_provider: 'nice',
    updated: 1595843453
  }
}
   * 
   * 
   * 
   * Response:  {
      code: -1,
      message: '카드정보 인증 및 빌키 발급에 실패하였습니다. [F113]유효기간오류 - 테스트모드에서는 KB카드 사용이 불가능합니다. (타카드는 테스트모드에서도 정상, KB카드도 실제 계약후에는 문제없음)',
      response: null
    } 

   */

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
