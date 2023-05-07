const axios = require("axios");
const END_POINT = "https://graph.facebook.com/v16.0/109483948795799/messages";

const headers = {
  Authorization:
    "Bearer EAARb0YgwKGkBAC8RTF6Ge2bZB6nZC2Sc4WJwcgx8Iiu7sCB3GtEZB4333OaaTzIR1MvEBDsHGBAbGORSYihY5CKZC0ky7MdMzZC92EevmI5e6lZCyGjgP3UOivZADgpwSvwl0WEcir6Wj4n7zxaSVIL5a0H7WtHsRGDHfQaREO4HiMuY2uyMyhP4VRejHPZBj5hKA8SFngA62gZDZD",
  "Content-Type": "application/json",
};

const sendWelcomeTemplate = (whatsAppId, templateId) => {
  const payload = {
    messaging_product: "whatsapp",
    to: whatsAppId,
    type: "template",
    template: {
      name: templateId,
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "Header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://5afd-197-185-105-220.ngrok-free.app/welcome_logo",
              },
            },
          ],
        },
      ],
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
  sendWelcomeTemplate: sendWelcomeTemplate,
};
