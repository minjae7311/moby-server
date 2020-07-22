import request from "request";
// import { Send } from "express";

export const readyPayment = async () => {
  const adminKey = process.env.KP_ADMIN_KEY;
  const CID = process.env.KP_ONETIME_CID;

  const options = {
    uri: "https://kapi.kakao.com/v1/payment/ready",
    method: "POST",
    form: {
      cid: CID,
      partner_order_id: "1234",
      partner_user_id: "1234",
      item_name: "test",
      quantity: 1,
      total_amount: 1,
      tax_free_amount: 0,
      approval_url: "https://koreablockchainweek.com",
      cancel_url: "https://koreablockchainweek.com",
      fail_url: "https://koreablockchainweek.com",
    },
    headers: {
      Host: "kapi.kakao.com",
      Authorization: "KakaoAK " + adminKey,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  // {
  //   tid: "T2786082956768948836",
  //   tms_result: false,
  //   next_redirect_app_url:
  //     "https://mockup-pg-web.kakao.com/v1/6fa466eeec5b4893a65010b27fbe1cb9b226bda684c32b6e526109d7df12154d/aInfo",
  //   next_redirect_mobile_url:
  //     "https://mockup-pg-web.kakao.com/v1/6fa466eeec5b4893a65010b27fbe1cb9b226bda684c32b6e526109d7df12154d/mInfo",
  //   next_redirect_pc_url:
  //     "https://mockup-pg-web.kakao.com/v1/6fa466eeec5b4893a65010b27fbe1cb9b226bda684c32b6e526109d7df12154d/info",
  //   android_app_scheme:
  //     "kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/v1/6fa466eeec5b4893a65010b27fbe1cb9b226bda684c32b6e526109d7df12154d/order",
  //   ios_app_scheme:
  //     "kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/v1/6fa466eeec5b4893a65010b27fbe1cb9b226bda684c32b6e526109d7df12154d/order",
  //   created_at: "2020-07-21T22:24:48",
  // };

  request.post(options, (err, res) => {
    console.log("\n\n\n\n\n\n######", err, res.body, "\n\n\n\n\n");
    if (err !== null) return err;
    else return res;
  });
};
