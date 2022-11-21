require("dotenv").config();
const { SMS_ID, SMS_SECRETKEY, SMS_ACCESSKEY } = process.env;
const CryptoJS = require("crypto-js");
const axios = require("axios");
const ID = SMS_ID;
const SECRETKEY = SMS_SECRETKEY;
const ACCESSKEY = SMS_ACCESSKEY;
console.log(ID);

const tp = Date.now().toString();

const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRETKEY);
const method = "POST";
const space = " ";
const url = `/sms/v2/services/${ID}/messages`;
const newLine = "\n";
const timestamp = tp;

hmac.update(method);
hmac.update(space);
hmac.update(url);
hmac.update(newLine);
hmac.update(timestamp);
hmac.update(newLine);
hmac.update(ACCESSKEY);
const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

module.exports = {
  Tomorrow: async (req, res) => {
    try {
      const verifysms = await axios.post(
        `https://sens.apigw.ntruss.com/sms/v2/services/${ID}/messages`,
        {
          type: "SMS",
          contentType: "COMM",
          countryCode: "82",
          from: "01038707344",
          content: `${req.name}님 ${req.shop} 예약 전날입니다.`,
          messages: [
            {
              to: `${req.number}`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-ncp-apigw-timestamp": tp,
            "x-ncp-iam-access-key": ACCESSKEY,
            "x-ncp-apigw-signature-v2": signature,
          },
        }
      );
      console.log("response", verifysms.data);
    } catch (err) {
      console.log(err);
    }
  },
  Today: async (req, res) => {
    try {
      const verifysms = await axios.post(
        `https://sens.apigw.ntruss.com/sms/v2/services/${ID}/messages`,
        {
          type: "SMS",
          contentType: "COMM",
          countryCode: "82",
          from: "01038707344",
          content: `${req.name}님 ${req.shop} 예약 당일입니다.`,
          messages: [
            {
              to: `${req.number}`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-ncp-apigw-timestamp": tp,
            "x-ncp-iam-access-key": ACCESSKEY,
            "x-ncp-apigw-signature-v2": signature,
          },
        }
      );
      console.log("response", verifysms.data);
    } catch (err) {
      console.log(err);
    }
  },
};
