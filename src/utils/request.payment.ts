import request from "request";
import User from "../entities/User";

export const requestPayment = async (user: User) => {
  const ADMIN_KEY = process.env.KP_ADMIN_KEY;
  const CID = process.env.KP_SUBSCRIP_CID;

  const SID = user.mainCredit.sid;

  const options = {
    uri: "https://kapi.kakao.com/v1/payment/subscription",
    method: "POST",
    form: {
      cid: CID,
      sid: SID,
      partner_order_id: "1234",
      partner_user_id: "1234",
      item_name: "test",
      quantity: 1,
      total_amount: 1,
      tax_free_amount: 1,
    },
    headers: {
      Host: "kapi.kakao.com",
      Authorization: "KakaoAK " + ADMIN_KEY,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  request.post(options, (err, res) => {
    console.log("\n\n\n\n\nRES  ::", res.body);
  });
};
