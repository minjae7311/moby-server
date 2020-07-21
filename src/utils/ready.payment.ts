import request from "request";
// import { Send } from "express";

export const readyPayment = async () => {
  const adminKey = process.env.KP_ADMIN_KEY;
  const CID = process.env.KP_SUBSCRIP_CID;

  const options = {
    uri: "https://kapi.kakao.com/v1/payment/ready",
    method: "POST",
    form: {
      cid: CID,
      partner_order_id: "1234",
      partner_user_id: "1234",
      item_name: "test",
      quantity: 0,
      total_amount: 0,
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

  // const res = {
  //   tid: "T2786084756360245862",
  //   tms_result: false,
  //   next_redirect_app_url:
  //     "https://mockup-pg-web.kakao.com/v1/c6550a013757a79e94e1275254e943b22c485bef10eb0bdf3510f17783f503d7/aInfo",
  //   next_redirect_mobile_url:
  //     "https://mockup-pg-web.kakao.com/v1/c6550a013757a79e94e1275254e943b22c485bef10eb0bdf3510f17783f503d7/mInfo",
  //   next_redirect_pc_url:
  //     "https://mockup-pg-web.kakao.com/v1/c6550a013757a79e94e1275254e943b22c485bef10eb0bdf3510f17783f503d7/info",
  //   android_app_scheme:
  //     "kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/v1/c6550a013757a79e94e1275254e943b22c485bef10eb0bdf3510f17783f503d7/order",
  //   ios_app_scheme:
  //     "kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/v1/c6550a013757a79e94e1275254e943b22c485bef10eb0bdf3510f17783f503d7/order",
  //   created_at: "2020-07-21T22:31:47",
  // };

  request.post(options, (err, res) => {
    console.log("\n\n\n\n\n\n", err, res.body, "\n\n\n\n\n");

    const resBody = JSON.parse(res.body);
    const { tid, next_redirect_app_url } = resBody;

    const pg_token = next_redirect_app_url.split("/")[4];

    const approve_options = {
      uri: "https://kapi.kakao.com/v1/payment/approve",
      method: "POST",
      form: {
        cid: CID,
        tid,
        partner_order_id: "1234",
        partner_user_id: "1234",
        pg_token,
      },

      headers: {
        Host: "kapi.kakao.com",
        Authorization: "KakaoAK " + adminKey,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };
    request.post(approve_options, (err, res) => {
      console.log("\n\n\n\n\n\n", err, res.body, "\n\n\n\n\n");
    });
  });
};
