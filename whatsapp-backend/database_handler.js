var admin = require("firebase-admin");
var serviceAccount = require("./human-capital-finance-firebase-adminsdk-spkm6-a9e1322c60.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
class DbHandler {
  constructor() {
    this.whatsAppApplicationsRef = admin
      .firestore()
      .collection("whatsapp_applications");
  }

  getApplicationDetails = async (whatsAppId) => {
    return this.whatsAppApplicationsRef.doc(whatsAppId).get();
  };

  updateApplicationMetaData = async (whatsAppId, payload) => {
    return this.whatsAppApplicationsRef
      .doc(whatsAppId)
      .set(payload, { merge: true });
  };

  removeSession = async (whatsAppId) => {
    return this.whatsAppApplicationsRef.doc(whatsAppId).delete();
  };
}

module.exports = {
  DbHandler: DbHandler,
};
