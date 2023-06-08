const { DbHandler } = require("./database_handler");
const dbHandler = new DbHandler();
const {
  applicationStatuses,
  templates,
  messages,
  genericConsts,
} = require("./constants");
const {
  sendTypeOfAccountPrompt,
  sendPaymentFrequencyPrompt,
  sendAmountQualifiedFor,
  sendBankInformationPrompt,
  sendStaticTemplate,
  sendDyamicMessage,
  sendWelcomeTemplate,
  sendChooseEmployee,
  sendMaritusStatusPrompt,
  sendTypeOfMarriagePrompt,
  sendContractEndDatePrompt,
  sendEmploymentStartDatePrompt,
  sendEmploymentStatusPrompt,
} = require("./whatsapp");

const checkApplication = async (whatsAppId) => {
  try {
    const results = await dbHandler.getApplicationDetails(whatsAppId);
    return results.exists ? results.data() : null;
  } catch (error) {
    console.log(
      `Error occurred while reading application details. Error details: ${error}`
    );
    return null;
  }
};

const sendWelcomeMessage = async (whatsAppId) => {
  var payload = {
    Status: applicationStatuses.START,
    DateUpdated: new Date().getTime(),
    DateCreated: new Date().getTime(),
  };

  try {
    await dbHandler.updateApplicationMetaData(whatsAppId, payload);
    await sendWelcomeTemplate(whatsAppId, templates.WELCOME);
  } catch (error) {
    console.error("An error occured while calling db handler...", error);
  }
};

const handleUpdateOnStatus = async (whatsAppId, payload, templateId) => {
  return dbHandler
    .updateApplicationMetaData(whatsAppId, payload)
    .then((results) => {
      sendStaticTemplate(whatsAppId, templateId);
    })
    .catch((error) => {
      console.error("An error occured while calling db handler...", error);
    });
};

const handleUpdateOnStatusAndSendDynamicMessage = async (
  whatsAppId,
  payload,
  messageId
) => {
  return dbHandler
    .updateApplicationMetaData(whatsAppId, payload)
    .then((results) => {
      return sendDyamicMessage(whatsAppId, messageId);
    })
    .catch((error) => {
      console.error("An error occured while calling db handler...", error);
    });
};

const processIncomingMessage = async (whatsAppId, messageBody, res) => {
  console.debug("About to proccess message...");

  if (messageBody.toLowerCase() == "r101") {
    dbHandler.removeSession(whatsAppId).finally(() => {
      console.log("Reseted session for WhatsApp Id: ", whatsAppId);
      res.send("done");
    });
  } else {
    checkApplication(whatsAppId)
      .then(async (applicationResults) => {
        if (applicationResults) {
          switch (applicationResults.Status) {
            case applicationStatuses.START:
              {
                const payload = {
                  Status: applicationStatuses.EMPLOYER_SELECTION,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendChooseEmployee(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              }

              break;

            case applicationStatuses.LOAN_PURPOSE:
              {
                const payload = {
                  Status: applicationStatuses.CITIZENSHIP_CONFIRMATION,
                };

                handleUpdateOnStatus(
                  whatsAppId,
                  payload,
                  templates.CITIZENSHIP_CONFIRMATION
                ).finally(() => {
                  res.send("done");
                });
              }

              break;

            case applicationStatuses.PERMIT_NUMBER_PROMPT:
              {
                const payload = {
                  Status: applicationStatuses.MARITUS_STATUS_PROMPT,
                };

                await Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendMaritusStatusPrompt(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              }

              break;

            case applicationStatuses.IDENTIFICATION_PROMPT:
              {
                if (
                  applicationResults.Identification_Type ==
                  genericConsts.IS_NON_SOUTH_AFRICAN
                ) {
                  const payload = {
                    Status: applicationStatuses.PERMIT_NUMBER_PROMPT,
                  };

                  const messageId = messages.PERMIT_NUMBER_MESSAGE;

                  Promise.all([
                    dbHandler.updateApplicationMetaData(whatsAppId, payload),
                    sendDyamicMessage(whatsAppId, messageId),
                  ]).finally(() => {
                    res.send("done");
                  });
                } else {
                  const payload = {
                    Status: applicationStatuses.MARITUS_STATUS_PROMPT,
                  };

                  Promise.all([
                    dbHandler.updateApplicationMetaData(whatsAppId, payload),
                    sendMaritusStatusPrompt(whatsAppId),
                  ]).finally(() => {
                    res.send("done");
                  });
                }
              }

              break;

            case applicationStatuses.PERSONAL_DETAILS_PROMPT:
              {
                const payload = {
                  Status: applicationStatuses.EMPLOYMENT_DETAILS_PROMP_ONE,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendStaticTemplate(
                    whatsAppId,
                    templates.EMPLOYMENT_DETAILS_HEADING
                  ),
                ]).finally(() => {
                  sendStaticTemplate(
                    whatsAppId,
                    templates.EMPLOYMENT_DETAILS_PROMP_ONE
                  ).finally(() => {
                    res.send("done");
                  });
                });
              }

              break;

            case applicationStatuses.EMPLOYMENT_DETAILS_PROMP_ONE:
              {
                const payload = {
                  Status: applicationStatuses.EMPLOYMENT_DETAILS_PROMP_TWO,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendEmploymentStatusPrompt(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              }

              break;

            case applicationStatuses.EMPLOYMENT_DETAILS_PROMP_THREE:
              {
                const payload = {
                  Status: applicationStatuses.LOAD_PREQUALIFIER,
                };

                await Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendStaticTemplate(
                    whatsAppId,
                    templates.LOAD_DETAILS_HEADING
                  ),
                ]);

                sendAmountQualifiedFor(whatsAppId, "1900").finally(() => {
                  res.send("done");
                });
              }

              break;

            case applicationStatuses.LOAD_DETAILS_HEADING:
              {
                const payload = {
                  Status: applicationStatuses.BANK_DETAILS_PROMPT_ONE,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendBankInformationPrompt(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              }

              break;

            case applicationStatuses.BANK_DETAILS_PROMPT_THREE:
              {
                const payload = {
                  Status: applicationStatuses.DEBIT_ORDER_AGREEMENT,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendStaticTemplate(
                    whatsAppId,
                    templates.DEBIT_ORDER_AGREEMENT
                  ),
                ]).finally(() => {
                  res.send("done");
                });
              }

              break;
          }
        } else {
          sendWelcomeMessage(whatsAppId).finally(() => {
            res.send("done");
          });
        }
      })
      .catch((error) => {
        console.log(
          "Error occured while reading status. WhatsaApp Id: ",
          whatsAppId,
          ". Error details: ",
          error
        );
        res.send("done");
      });
  }
};

const processIncomingButtonClick = async (whatsAppId, messageData, res) => {
  console.log("About to proccess incoming button event...");
  checkApplication(whatsAppId)
    .then(async (applicationResults) => {
      if (applicationResults) {
        switch (applicationResults.Status) {
          case applicationStatuses.START:
            {
              const payload = {
                Status: applicationStatuses.EMPLOYER_SELECTION,
              };

              await Promise.all([
                dbHandler.updateApplicationMetaData(whatsAppId, payload),
                sendChooseEmployee(whatsAppId),
              ]);
              res.send("done");
            }

            break;

          case applicationStatuses.CITIZENSHIP_CONFIRMATION:
            {
              let templateId =
                messageData == "Yes"
                  ? templates.ID_NUMBER_PROMPT
                  : templates.PASSPORT_NUMBER_PROMPT;

              const payload = {
                Identification_Type:
                  messageData == "Yes"
                    ? genericConsts.IS_SOUTH_AFRICAN
                    : genericConsts.IS_NON_SOUTH_AFRICAN,
                Status: applicationStatuses.IDENTIFICATION_PROMPT,
              };

              handleUpdateOnStatus(whatsAppId, payload, templateId).finally(
                () => {
                  res.send("done");
                }
              );
            }
            break;

          case applicationStatuses.DEBIT_ORDER_AGREEMENT:
            {
              let messageId = "";

              if (messageData == "Yes, I agree") {
                messageId = messages.ID_UPLOAD_MESSAGE;

                const payload = {
                  Status: applicationStatuses.IDENTIFICATION_DOC_UPLOAD,
                };

                sendStaticTemplate(
                  whatsAppId,
                  templates.DOCUMENT_UPLOAD_HEADING
                ).then((results) => {
                  handleUpdateOnStatusAndSendDynamicMessage(
                    whatsAppId,
                    payload,
                    messageId
                  ).finally(() => {
                    res.send("done");
                  });
                });
              } else {
                sendDyamicMessage(
                  whatsAppId,
                  messages.DEBIT_ORDER_MUST_BE_AGREED_MESSAGE
                )
                  .finally(() => {
                    return sendStaticTemplate(
                      whatsAppId,
                      templates.DEBIT_ORDER_AGREEMENT
                    );
                  })
                  .finally(() => {
                    res.send("done");
                  });
              }
            }

            break;

          case applicationStatuses.CONSENT:
            {
              if (messageData === "Continue") {
                const payload = {
                  Status: applicationStatuses.DONE,
                };

                handleUpdateOnStatus(
                  whatsAppId,
                  payload,
                  templates.THANK_YOU
                ).finally(() => {
                  res.send("done");
                });
              } else {
              }
            }
            break;

          default: {
            console.log("On default", applicationResults.Status);
            res.send("done");
          }
        }
      } else {
        sendWelcomeMessage(whatsAppId).finally(() => {
          res.send("done");
        });
      }
    })
    .catch((error) => {
      console.log(
        "Error occured while reading status. WhatsaApp Id: ",
        whatsAppId,
        ". Error details: ",
        error
      );
      res.send("done");
    });
};

const processIncomingFileUpload = async (whatsAppId, attachment, res) => {
  console.log("About to proccess attachment event...");
  checkApplication(whatsAppId)
    .then((applicationResults) => {
      if (applicationResults) {
        switch (applicationResults.Status) {
          case applicationStatuses.IDENTIFICATION_DOC_UPLOAD:
            {
              const payload = {
                Status: applicationStatuses.PROOF_OF_RESIDENCE,
              };

              handleUpdateOnStatus(
                whatsAppId,
                payload,
                templates.PROOF_OF_RESIDENCE
              ).finally(() => {
                res.send("done");
              });
            }

            break;

          case applicationStatuses.PERMIT_DOC:
            {
              const payload = {
                Status: applicationStatuses.BANK_STATMENT_DOC,
              };

              handleUpdateOnStatus(
                whatsAppId,
                payload,
                templates.BANK_STATMENT_DOC
              ).finally(() => {
                res.send("done");
              });
            }

            break;

          case applicationStatuses.BANK_STATMENT_DOC:
            {
              const payload = {
                Status: applicationStatuses.CONSENT,
              };

              handleUpdateOnStatus(
                whatsAppId,
                payload,
                templates.SERVICE_AGREEMENT_AND_TERMS
              )
                .finally(() => {
                  return handleUpdateOnStatus(
                    whatsAppId,
                    payload,
                    templates.CONSENT
                  );
                })
                .finally(() => {
                  res.send("done");
                });
            }

            break;

          case applicationStatuses.PROOF_OF_RESIDENCE:
            {
              let templateId = "";
              let status = "";

              if (
                applicationResults.Identification_Type ==
                genericConsts.IS_SOUTH_AFRICAN
              ) {
                templateId = templates.BANK_STATMENT_DOC;
                status = applicationStatuses.BANK_STATMENT_DOC;
              } else {
                templateId = templates.PERMIT_DOC;
                status = applicationStatuses.PERMIT_DOC;
              }

              const payload = {
                Status: status,
              };

              handleUpdateOnStatus(whatsAppId, payload, templateId).finally(
                () => {
                  res.send("done");
                }
              );
            }

            break;

          case applicationStatuses.PERMIT_DOC:
            {
              const payload = {
                Status: applicationStatuses.BANK_STATMENT_DOC,
              };

              handleUpdateOnStatus(
                whatsAppId,
                payload,
                templates.BANK_STATMENT_DOC
              ).finally(() => {
                res.send("done");
              });
            }

            break;
        }
      }
    })
    .catch((error) => {
      console.log(
        "Error occured while reading status. WhatsaApp Id: ",
        whatsAppId,
        ". Error details: "
        // error
      );
      res.send("done");
    });
};

const processIncomingInteractiveResponse = async (
  whatsAppId,
  interactiveReply,
  res
) => {
  console.debug("About to interactive reply message...");

  checkApplication(whatsAppId)
    .then((applicationResults) => {
      if (applicationResults) {
        switch (applicationResults.Status) {
          case applicationStatuses.EMPLOYER_SELECTION:
            {
              const payload = {
                Status: applicationStatuses.LOAN_PURPOSE,
              };

              handleUpdateOnStatus(whatsAppId, payload, templates.LOAN_PURPOSE)
                .catch((error) => {
                  console.log(error);
                })
                .finally(() => {
                  res.send("done");
                });
            }

            break;

          case applicationStatuses.EMPLOYMENT_DETAILS_PROMP_TWO:
            {
              const answerId = interactiveReply.list_reply.id;

              if (answerId == "rssdsdkddlP62t3f2") {
                const payload = {
                  Status: applicationStatuses.EMPLOYMENT_DATE_CONFIRMATION,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendEmploymentStartDatePrompt(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              } else if (
                answerId == "sdsjhlksdxsj3h37e3" ||
                answerId == "Lksdl02lt3f2"
              ) {
                const payload = {
                  Status: applicationStatuses.EMPLOYMENT_DATE_CONFIRMATION,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendContractEndDatePrompt(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              } else if (answerId == "kd2sds533ld72t3f2") {
                const payload = {
                  Status:
                    applicationStatuses.LOAN_DECLINED_COMMISION_EMPLOYMENT,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendDyamicMessage(
                    whatsAppId,
                    messages.LOAN_DECLINED_COMMISION_EMPLOYMENT
                  ),
                ]).finally(() => {
                  res.send("done");
                });
              }
            }
            break;

          case applicationStatuses.MARITUS_STATUS_PROMPT:
            {
              if (interactiveReply.list_reply.id === "jslsajsjdj3h37e3") {
                const payload = {
                  Status: applicationStatuses.TYPE_OF_MARRIAGE_PROMPT,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendTypeOfMarriagePrompt(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              } else {
                const payload = {
                  Status: applicationStatuses.PERSONAL_DETAILS_PROMPT,
                };

                handleUpdateOnStatus(
                  whatsAppId,
                  payload,
                  templates.PERSONAL_DETAILS_PROMPT
                )
                  .catch((error) => {
                    console.log(error);
                  })
                  .finally(() => {
                    res.send("done");
                  });
              }
            }

            break;

          case applicationStatuses.TYPE_OF_MARRIAGE_PROMPT:
            {
              const payload = {
                Status: applicationStatuses.PERSONAL_DETAILS_PROMPT,
              };

              handleUpdateOnStatus(
                whatsAppId,
                payload,
                templates.PERSONAL_DETAILS_PROMPT
              )
                .catch((error) => {
                  console.log(error);
                })
                .finally(() => {
                  res.send("done");
                });
            }
            break;

          case applicationStatuses.LOAD_PREQUALIFIER:
            {
              if (interactiveReply.list_reply.id === "ymspkfd2t3f2") {
                const payload = {
                  Status: applicationStatuses.BANK_DETAILS_PROMPT_ONE,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendBankInformationPrompt(whatsAppId),
                ]).finally(() => {
                  res.send("done");
                });
              } else if (interactiveReply.list_reply.id === "ndpspjhhjdsj") {
                sendDyamicMessage(
                  whatsAppId,
                  messages.PLEASE_APPLY_AGAIN_LATER
                ).finally(() => {
                  res.send("done");
                });
              }
            }
            break;

          case applicationStatuses.BANK_DETAILS_PROMPT_ONE:
            {
              const payload = {
                Status: applicationStatuses.BANK_DETAILS_PROMPT_TWO,
              };

              Promise.all([
                dbHandler.updateApplicationMetaData(whatsAppId, payload),
                sendTypeOfAccountPrompt(whatsAppId),
              ]).finally(() => {
                res.send("done");
              });
            }

            break;

          case applicationStatuses.BANK_DETAILS_PROMPT_TWO:
            {
              const payload = {
                Status: applicationStatuses.BANK_DETAILS_PROMPT_THREE,
              };

              Promise.all([
                dbHandler.updateApplicationMetaData(whatsAppId, payload),
                sendDyamicMessage(
                  whatsAppId,
                  messages.BANK_DETAILS_PROMPT_THREE
                ),
              ]).finally(() => {
                res.send("done");
              });
            }
            break;

          case applicationStatuses.EMPLOYMENT_DATE_CONFIRMATION:
            {
              const answerId = interactiveReply.list_reply.id;

              if (answerId == "mo5iid2t3f2" || answerId == "kskmolid2t3f2") {
                const payload = {
                  Status: applicationStatuses.EMPLOYMENT_DETAILS_PROMP_THREE,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendDyamicMessage(
                    whatsAppId,
                    messages.EMPLOYMENT_DETAILS_PROMP_THREE
                  ),
                ]).finally(() => {
                  res.send("done");
                });
              } else if (answerId == "dks3jhhjssj") {
                const payload = {
                  Status:
                    applicationStatuses.LOAN_DECLINED_EMPLOYMENT_START_DATE,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendDyamicMessage(
                    whatsAppId,
                    messages.LOAN_DECLINED_EMPLOYMENT_START_DATE
                  ),
                ]).finally(() => {
                  res.send("done");
                });
              } else if (answerId == "lskdo9jssj") {
                const payload = {
                  Status: applicationStatuses.LOAN_DECLINED_CONTRACT_END_DATE,
                };

                Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendDyamicMessage(
                    whatsAppId,
                    messages.LOAN_DECLINED_CONTRACT_END_DATE
                  ),
                ]).finally(() => {
                  res.send("done");
                });
              } else {
                console.log("Unknown error: ", applicationResults.Status);
                res.send("done");
              }
            }

            break;

          default: {
            console.log("On default", applicationResults.Status);
            res.send("done");
          }
        }
      }
    })
    .catch((error) => {
      console.log(
        "Error occured while reading status. WhatsaApp Id: ",
        whatsAppId,
        ". Error details: ",
        error
      );
      res.send("done");
    });
};

module.exports = {
  processIncomingMessage: processIncomingMessage,
  processIncomingButtonClick: processIncomingButtonClick,
  processIncomingFileUpload: processIncomingFileUpload,
  processIncomingInteractiveResponse: processIncomingInteractiveResponse,
};
