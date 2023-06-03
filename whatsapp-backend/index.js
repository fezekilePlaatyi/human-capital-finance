const {
  processIncomingMessage,
  processIncomingButtonClick,
  processIncomingFileUpload,
  processIncomingInteractiveResponse,
} = require("./core_processor");

const verifyToken = (req) => {
  return req.query["hub.verify_token"] === "helloworld";
};

const handler = async (req, res) => {
  const httpMethod = req.method;
  const messageData = req.body;

  if (httpMethod == "GET") {
    console.log(messageData);
    if (verifyToken(req)) {
      res.send(req.query["hub.challenge"]);
    } else {
      res.send("Forbidden");
    }
  } else {
    const whatsAppPayload = messageData.entry[0].changes[0].value;
    if (whatsAppPayload.contacts && whatsAppPayload.contacts[0]) {
      const whatsAppId = whatsAppPayload.contacts[0].wa_id;
      const typeOfMessage = whatsAppPayload.messages[0].type;
      if (typeOfMessage === "text") {
        const messageBody = whatsAppPayload.messages[0].text.body;
        processIncomingMessage(whatsAppId, messageBody, res);
      } else if (typeOfMessage === "button") {
        const messageBody = whatsAppPayload.messages[0].button.payload;
        processIncomingButtonClick(whatsAppId, messageBody, res);
      } else if (typeOfMessage === "document" || typeOfMessage === "image") {
        const attachment =
          whatsAppPayload.messages[0].document ||
          whatsAppPayload.messages[0].image;
        if (
          attachment.mime_type === "application/pdf" ||
          attachment.mime_type === "image/jpeg" ||
          attachment.mime_type === "image/png"
        ) {
          processIncomingFileUpload(whatsAppId, attachment, res);
        } else {
          console.log(JSON.stringify(whatsAppPayload));
          res.send("ok");
        }
      } else if (typeOfMessage === "interactive") {
        const interactiveReply = whatsAppPayload.messages[0].interactive;
        processIncomingInteractiveResponse(whatsAppId, interactiveReply, res);
      } else {
        console.log(JSON.stringify(whatsAppPayload));
        res.send("ok");
      }
    } else {
      console.log("No contacts found, i.e its probably message read event...");
      // console.log(JSON.stringify(whatsAppPayload));
      res.send("ok");
    }
  }
};

module.exports = {
  handler: handler,
};
