// https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples
const axios = require("axios");
const message = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
      changes: [
        {
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "27780687445",
              phone_number_id: "27780687445",
            },
            contacts: [
              {
                profile: {
                  name: "NAME",
                },
                wa_id: "27780687445",
              },
            ],
            messages: [
              {
                from: "27780687445",
                id: "wamid.ID",
                timestamp: "TIMESTAMP",
                text: {
                  body: "MESSAGE_BODY",
                },
                type: "text",
              },
            ],
          },
          field: "messages",
        },
      ],
    },
  ],
};

const URL = "http://localhost:3000/wa";

axios
  .post(URL)
  .then(function (res) {
    // handle the response
  })
  .catch(function (err) {
    // handle the error
  });
