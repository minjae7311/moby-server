import request from "request";
// import { Send } from "express";

export const readyPayment = async () => {
  const adminKey = process.env.KP_ADMIN_KEY;
<<<<<<< HEAD
<<<<<<< HEAD
  const CID = process.env.KP_ONETIME_CID;
=======
  const CID = process.env.KP_SUBSCRIP_CID;
>>>>>>> 78a74f3c223f598facb03ffde7ad9b5498068010
=======
  const CID = process.env.KP_SUBSCRIP_CID;
>>>>>>> 78a74f3c223f598facb03ffde7ad9b5498068010

  const options = {
    uri: "https://kapi.kakao.com/v1/payment/ready",
    method: "POST",
    form: {
      cid: CID,
      partner_order_id: "1234",
      partner_user_id: "1234",
      item_name: "test",
<<<<<<< HEAD
<<<<<<< HEAD
      quantity: 1,
      total_amount: 1,
=======
      quantity: 0,
      total_amount: 0,
>>>>>>> 78a74f3c223f598facb03ffde7ad9b5498068010
=======
      quantity: 0,
      total_amount: 0,
>>>>>>> 78a74f3c223f598facb03ffde7ad9b5498068010
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

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 78a74f3c223f598facb03ffde7ad9b5498068010
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

      // {"msg":"authentication doesn't complete!","code":-701,"extras":{"method_result_code":"9999","method_result_message":"결제 실패. 잠시 후 재시도 바랍니다."}} 
      // -701	결제 인증이 완료되지 않은 상태에서 결제 승인 API를 호출한 경우	400

      // 테스트에서 결제 승인 하려면 어케 해야하나요???

    });
<<<<<<< HEAD
>>>>>>> 78a74f3c223f598facb03ffde7ad9b5498068010
=======
>>>>>>> 78a74f3c223f598facb03ffde7ad9b5498068010
  });
};
