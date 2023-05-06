const axios = require("axios");
const END_POINT = "https://graph.facebook.com/v16.0/109483948795799/messages";

const headers = {
  Authorization:
    "Bearer EAARb0YgwKGkBAGTX1NABWsb4w0CEeSGi6I4Ee0VcqsGuVHl4QwJNiDRfye3JWZAVMdTam3HRkpdErgZBfhjriiYGIXM7DZCvsuTxT6XMreaZCVCBy3IfEpixDqEpjkEq6d67d7ZB4oLdhfUGZCv1XE1p4qpqZBxZCELP97khJpPkrZBTdTKlq9sEwegP1glZB9NHeJtqU0lU7KmgZDZD",
  "Content-Type": "application/json",
};

const sendStaticTemplate = (whatsAppId, templateId) => {
  const payload = {
    messaging_product: "whatsapp",
    to: whatsAppId,
    type: "template",
    template: {
      name: templateId,
      language: {
        code: "en_US",
      },
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(END_POINT, payload, {
        headers: headers,
      })
      .then((res) => {
        resolve("ok");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const sendDyamicMessage = (whatsAppId, messageBody) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "text",
    text: {
      preview_url: false,
      body: messageBody,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(END_POINT, payload, {
        headers: headers,
      })
      .then((res) => {
        resolve("ok");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  sendStaticTemplate: sendStaticTemplate,
  sendDyamicMessage: sendDyamicMessage,
};
