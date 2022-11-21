const SMS_ID = "ncp:sms:kr:295786890935:sms";
const SMS_SECRETKEY = "bRIWXEsxcSbO3Y0SahcjHAY84XQWe0Mf4T1dCDzK";
const SMS_ACCESSKEY = "f7KefXhvy9bepdA2NLZt";
const axios = require("axios");
const CryptoJS = require("crypto-js");
const sha256 = require("crypto-js/sha256");
const base64 = require("crypto-js/enc-base64");

const tp = Date.now().toString();

const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SMS_SECRETKEY);
const method = "POST";
const space = " ";
const url = `/sms/v2/services/${SMS_ID}/messages`;
const newLine = "\n";
const timestamp = tp;

hmac.update(method);
hmac.update(space);
hmac.update(url);
hmac.update(newLine);
hmac.update(timestamp);
hmac.update(newLine);
hmac.update(SMS_ACCESSKEY);
const hash = hmac.finalize();
const sig = hash.toString(CryptoJS.enc.Base64);

(async () => {
  const res = await axios.post(
    `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_ID}/messages`,
    {
      type: "SMS",
      countryCode: "82",
      from: "01038707344",
      content: `${shop}`,
      messages: [
        {
          to: "01038707344",
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": tp,
        "x-ncp-iam-access-key": SMS_ACCESSKEY,
        "x-ncp-apigw-signature-v2": sig,
      },
    }
  );
  console.log("\n");
  console.log(res.data);
})();
