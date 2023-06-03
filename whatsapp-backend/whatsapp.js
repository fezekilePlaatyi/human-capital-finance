const axios = require("axios");
const END_POINT = "https://graph.facebook.com/v16.0/109483948795799/messages";

const headers = {
  Authorization:
    "Bearer EAARb0YgwKGkBANDcKDHiVLYDcY2jipwkL8Y6QZAO8IoZAdib8ZB4R0aomMjPZCQNVfZCX5zvoU0NfGqS0Jl4ZCv95JKbZAPdLnbx7nlHvmTerjHebcXkZC9unbxUpQmephQc4EP23CET9NX9CB5pYZBZApUGv59TegrhPQVXYHMaMxXZB6JD7NXPfKuwIOq3HePB5KUPyYZAZAF0QJwZDZD",
  "Content-Type": "application/json",
};

const sendRestApi = async (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(END_POINT, payload, {
        headers: headers,
      })
      .then((res) => resolve("Sent Welcome Message"))
      .catch((error) => reject(error));
  });
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
                link: "https://cd35-41-76-102-134.ngrok-free.app/welcome_logo",
              },
            },
          ],
        },
      ],
    },
  };

  return sendRestApi(payload);
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

  return sendRestApi(payload);
};

const sendChooseEmployee = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Dear Applicant",
      },
      body: {
        text: `We are currently accepting applications exclusively from employees of the following Companies. To proceed with your application, please select your employer from list below.`,
      },
      footer: {
        text: "Step 1/9",
      },
      action: {
        button: "Company List",
        sections: [
          {
            rows: [
              {
                id: `kklr325362t3f2`,
                title: "Moret Mining",
                description: "https://www.moretmining.com/",
              },
              {
                id: `sjdjhsjdxsdxsj3h37e3`,
                title: "Augusto Steel",
                description: "https://augustasteel.co.za/",
              },
              {
                id: `kasdsdklr325362t3f2`,
                title: "Tiger Wheel & Tyres",
                description: "https://www.twt.co.za/",
              },
              {
                id: `sjdjhslsajsjdj3h37e3`,
                title: "Natures Harvest",
                description: "https://naturesharvest.ca/",
              },
              {
                id: `kklr32536wdwdasl2t3f2`,
                title: "Sequence Logistics",
                description: "https://www.selog.co.za/",
              },
              {
                id: `sjdjhsjdjwdkw3h37e3`,
                title: "McCain",
                description: "https://www.mccain.com/",
              },
              {
                id: `sjdjhsjdj3h37e3sdwd`,
                title: "Tashas",
                description: "https://www.tashascafe.com/",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
};

const sendMaritusStatusPrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "What is your Marital status?",
      },
      body: {
        text: `Please select your maritus status from list below.`,
      },
      footer: {
        text: "Step 4/9",
      },
      action: {
        button: "Maritus Statuses",
        sections: [
          {
            rows: [
              {
                id: `r325362t3f2`,
                title: "Single",
              },
              {
                id: `jhsjdxsdxsj3h37e3`,
                title: "Widow",
              },
              {
                id: `32sds5362t3f2`,
                title: "Divorced",
              },
              {
                id: `jslsajsjdj3h37e3`,
                title: "Married",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
};

const sendPaymentFrequencyPrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Payment Frequency",
      },
      body: {
        text: `Please select your payment frequency from list below.`,
      },
      action: {
        button: "Payment Frequency",
        sections: [
          {
            rows: [
              {
                id: `rssdsdsj3l325362t3f2`,
                title: "Weekly",
              },
              {
                id: `sdsjhssjfddpsdxsj3h37e3`,
                title: "Fortnightly",
              },
              {
                id: `kd2sds538237262t3f2`,
                title: "Monthly",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
};

const sendEmploymentStatusPrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Employment Status",
      },
      body: {
        text: `Please select answer on list below.`,
      },
      action: {
        button: "Employment Statuses",
        sections: [
          {
            rows: [
              {
                id: `rssdsdkdkfdlP62t3f2`,
                title: "Permanent",
              },
              {
                id: `sdsjhljdksdxsj3h37e3`,
                title: "Fixed Term Contract",
              },
              {
                id: `kd2sds53823ld72t3f2`,
                title: "Employed on Commission",
              },
              {
                id: `Lksdl0232362lt3f2`,
                title: "Independent Contractor",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
};

const sendBankInformationPrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Bank Name",
      },
      body: {
        text: `Please select answer on list below.`,
      },
      footer: {
        text: `Step 8/9`,
      },
      action: {
        button: "Bank names list",
        sections: [
          {
            rows: [
              {
                id: `rssdfnbasddsdkdkfdlP62t3f2`,
                title: "FNB",
              },
              {
                id: `sdkskjk3j43y89jjssj3h37e3`,
                title: "Standard Bank",
              },
              {
                id: `lssjfdkj38ndld72t3f2`,
                title: "Capitec",
              },
              {
                id: `l3432362lt3f2`,
                title: "Nedbank",
              },
              {
                id: `sdkskj34kh37e3`,
                title: "Bidvest",
              },
              {
                id: `l34fdkj38ndld72t3f2`,
                title: "Tyme Bank",
              },
              {
                id: `lk98883332bas762lt3f2`,
                title: "Bidvest",
              },
              {
                id: `pdpajpb32362lt3f2`,
                title: "Discovery",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
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

  return sendRestApi(payload);
};

const sendTypeOfAccountPrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Type of account",
      },
      body: {
        text: `Please select answer on list below.`,
      },
      action: {
        button: "Type of account",
        sections: [
          {
            rows: [
              {
                id: `monpkfd2t3f2`,
                title: "Cheque",
              },
              {
                id: `dellkjhhjdsj`,
                title: "Savings",
              },
              {
                id: `kPmlddldt3k`,
                title: "Transmission",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
};

module.exports = {
  sendStaticTemplate: sendStaticTemplate,
  sendDyamicMessage: sendDyamicMessage,
  sendWelcomeTemplate: sendWelcomeTemplate,
  sendChooseEmployee: sendChooseEmployee,
  sendMaritusStatusPrompt: sendMaritusStatusPrompt,
  sendPaymentFrequencyPrompt: sendPaymentFrequencyPrompt,
  sendEmploymentStatusPrompt: sendEmploymentStatusPrompt,
  sendBankInformationPrompt: sendBankInformationPrompt,
  sendTypeOfAccountPrompt: sendTypeOfAccountPrompt,
};
