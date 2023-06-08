const axios = require("axios");
const END_POINT = "https://graph.facebook.com/v16.0/109483948795799/messages";
const moment = require("moment");

const headers = {
  Authorization:
    "Bearer EAARb0YgwKGkBAAn1kPfPeMpcnf5ZBcbUAhPhEndUlRdHlkl9YGZCgbH8GnZAUNySYAKPyyH4iwYIMjB6LBaZCwRneZBEmNeVmnFedjgww69BTnHhtn5bp6ofQuLdznmZBjZCiOBZANrEOt76Be4m9QzTqNxrLB1d2z7ZBKQvxjXbJZBbZAn0ZAtizXeuQsVwINZAcn2BTUMMePSn1KPzj2TrerEiIAZBp1cSWSxTEZD",
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
                link: "https://f755-41-76-102-134.ngrok-free.app/welcome_logo",
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

const sendTypeOfMarriagePrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Type of Marriage",
      },
      body: {
        text: `Please select your type of Marriage from list below.`,
      },
      action: {
        button: "Marriage types",
        sections: [
          {
            rows: [
              {
                id: `mmm5362t3f2`,
                title: "ANC",
                description: "Antenuptial Contract",
              },
              ,
              {
                id: `kmkmxsj3h37e3`,
                title: "COP",
                description: "Community of property",
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
                id: `rssdsdkddlP62t3f2`,
                title: "Permanent",
              },
              {
                id: `sdsjhlksdxsj3h37e3`,
                title: "Fixed Term Contract",
              },
              {
                id: `kd2sds533ld72t3f2`,
                title: "Employed on Commission",
              },
              {
                id: `Lksdl02lt3f2`,
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

const sendAmountQualifiedFor = (whatsAppId, amount) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Loan Amount",
      },
      body: {
        text: `Based on your credit score, you are pre-qualified for an Amount of R${amount}.\n\nClick *Continue* below to apply for it.`,
      },
      action: {
        button: "Select reply.",
        sections: [
          {
            rows: [
              {
                id: `ymspkfd2t3f2`,
                title: "Continue",
              },
              {
                id: `ndpspjhhjdsj`,
                title: "Decline Offer",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
};

const sendEmploymentStartDatePrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Start Date Confirmation",
      },
      body: {
        text: `Where you employed before 6 month from now i.e *${moment()
          .subtract(6, "months")
          .format("DD MMMM YYYY")}*?`,
      },
      action: {
        button: "Click here to answer",
        sections: [
          {
            rows: [
              {
                id: `mo5iid2t3f2`,
                title: "Yes",
              },
              {
                id: `dks3jhhjssj`,
                title: "No",
              },
            ],
          },
        ],
      },
    },
  };

  return sendRestApi(payload);
};

const sendContractEndDatePrompt = (whatsAppId) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: whatsAppId,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Start Date Confirmation",
      },
      body: {
        text: `Does your contract ends after 4 months from now i.e *${moment()
          .add(4, "months")
          .format("DD MMMM YYYY")}*?`,
      },
      action: {
        button: "Click here to answer",
        sections: [
          {
            rows: [
              {
                id: `kskmolid2t3f2`,
                title: "Yes",
              },
              {
                id: `lskdo9jssj`,
                title: "No",
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
  sendTypeOfMarriagePrompt: sendTypeOfMarriagePrompt,
  sendEmploymentStartDatePrompt: sendEmploymentStartDatePrompt,
  sendContractEndDatePrompt: sendContractEndDatePrompt,
  sendAmountQualifiedFor: sendAmountQualifiedFor,
};
