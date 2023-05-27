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
  sendBankInformationPrompt,
  sendStaticTemplate,
  sendDyamicMessage,
  sendWelcomeTemplate,
  sendChooseEmployee,
  sendMaritusStatusPrompt,
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

                await Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendChooseEmployee(whatsAppId),
                ]);
                res.send("done");
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

            case applicationStatuses.IDENTIFICATION_PROMPT:
              {
                const payload = {
                  Status: applicationStatuses.MARITUS_STATUS_PROMPT,
                };

                await Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendMaritusStatusPrompt(whatsAppId),
                ]);
                res.send("done");
              }

              break;

            case applicationStatuses.PERSONAL_DETAILS_PROMPT:
              {
                const payload = {
                  Status: applicationStatuses.EMPLOYMENT_DETAILS_PROMP_ONE,
                };

                handleUpdateOnStatusAndSendDynamicMessage(
                  whatsAppId,
                  payload,
                  messages.EMPLOYMENT_DETAILS_HEADING
                ).finally(async () => {
                  await sendDyamicMessage(
                    whatsAppId,
                    messages.EMPLOYMENT_DETAILS_PROMP_ONE
                  );
                  res.send("done");
                });
              }

              break;

            case applicationStatuses.EMPLOYMENT_DETAILS_PROMP_ONE:
              {
                const payload = {
                  Status: applicationStatuses.EMPLOYMENT_DETAILS_PROMP_TWO,
                };

                await Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendPaymentFrequencyPrompt(whatsAppId),
                ]);
                res.send("done");
              }

              break;

            case applicationStatuses.BANK_DETAILS_PROMPT_THREE:
              {
                const payload = {
                  Status: applicationStatuses.DEBIT_ORDER_AGREEMENT,
                };

                await Promise.all([
                  dbHandler.updateApplicationMetaData(whatsAppId, payload),
                  sendStaticTemplate(
                    whatsAppId,
                    templates.DEBIT_ORDER_AGREEMENT
                  ),
                ]);
                res.send("done");
              }

              break;

              break;

            //   case applicationStatuses.EMPOLOYEE_NUMBER_PROMPT:
            //     {
            //       const payload = {
            //         Status: applicationStatuses.PARTIAL_EMPLOYER_DETAILS,
            //       };

            //       handleUpdateOnStatus(
            //         whatsAppId,
            //         payload,
            //         templates.PARTIAL_EMPLOYER_DETAILS
            //       ).finally(() => {
            //         res.send("done");
            //       });
            //     }

            //     break;

            //   case applicationStatuses.FULL_EMPLOYER_DETAILS:
            //   case applicationStatuses.PARTIAL_EMPLOYER_DETAILS:
            //     {
            //       const payload = {
            //         Status: applicationStatuses.SALARY_INFO_PROMPT,
            //       };

            //       handleUpdateOnStatus(
            //         whatsAppId,
            //         payload,
            //         templates.SALARY_INFO_PROMPT
            //       ).finally(() => {
            //         res.send("done");
            //       });
            //     }

            //     break;

            //   case applicationStatuses.SALARY_INFO_PROMPT:
            //     {
            //       const payload = {
            //         Status: applicationStatuses.LOAN_AMOUNT,
            //       };

            //       handleUpdateOnStatus(
            //         whatsAppId,
            //         payload,
            //         templates.LOAN_AMOUNT
            //       ).finally(() => {
            //         res.send("done");
            //       });
            //     }

            //     break;

            //   case applicationStatuses.LOAN_AMOUNT:
            //     {
            //       const payload = {
            //         Status: applicationStatuses.LOAN_PERIOD,
            //       };

            //       handleUpdateOnStatus(
            //         whatsAppId,
            //         payload,
            //         templates.LOAN_PERIOD
            //       ).finally(() => {
            //         res.send("done");
            //       });
            //     }
            //     break;

            //   case applicationStatuses.LOAN_PERIOD:
            //     {
            //       const payload = {
            //         Status: applicationStatuses.BANK_DETAILS_PROMPT,
            //       };

            //       handleUpdateOnStatusAndSendDynamicMessage(
            //         whatsAppId,
            //         payload,
            //         messages.BANK_DETAILS_MESSAGE
            //       ).finally(() => {
            //         res.send("done");
            //       });
            //     }

            //     break;

            //   case applicationStatuses.BANK_DETAILS_PROMPT:
            //     {
            //       const payload = {
            //         Status: applicationStatuses.DEBIT_ORDER_AGREEMENT,
            //       };

            //       handleUpdateOnStatus(
            //         whatsAppId,
            //         payload,
            //         templates.DEBIT_ORDER_AGREEMENT
            //       ).finally(() => {
            //         res.send("done");
            //       });
            //     }

            //     break;

            //   default: {
            //     console.log("On default", applicationResults.Status);
            //     res.send("done");
            //   }
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

          case applicationStatuses.BANK_DETAILS_PROMPT_ONE:
            {
              const payload = {
                Status: applicationStatuses.BANK_DETAILS_PROMPT_TWO,
              };

              await Promise.all([
                dbHandler.updateApplicationMetaData(whatsAppId, payload),
                sendTypeOfAccountPrompt(whatsAppId),
              ]);
              res.send("done");
            }

            break;

          // case applicationStatuses.CITIZENSHIP_CONFIRMATION:
          //   {
          //     let templateId =
          //       messageData == "Yes"
          //         ? templates.ID_NUMBER_PROMPT
          //         : templates.PASSPORT_NUMBER_PROMPT;

          //     const payload = {
          //       Identification_Type:
          //         messageData == "Yes"
          //           ? genericConsts.IS_SOUTH_AFRICAN
          //           : genericConsts.IS_NON_SOUTH_AFRICAN,
          //       Status: applicationStatuses.IDENTIFICATION_PROMPT,
          //     };

          //     handleUpdateOnStatus(whatsAppId, payload, templateId).finally(
          //       () => {
          //         res.send("done");
          //       }
          //     );
          //   }
          //   break;

          // case applicationStatuses.CONFIRM_EMPLOYEE_NUMBER:
          //   {
          //     let templateId = "";
          //     let status = "";
          //     if (messageData == "Yes") {
          //       templateId = templates.EMPOLOYEE_NUMBER_PROMPT;
          //       status = applicationStatuses.EMPOLOYEE_NUMBER_PROMPT;
          //     } else {
          //       templateId = templates.FULL_EMPLOYER_DETAILS;
          //       status = applicationStatuses.FULL_EMPLOYER_DETAILS;
          //     }

          //     const payload = {
          //       Status: status,
          //     };

          //     handleUpdateOnStatus(whatsAppId, payload, templateId).finally(
          //       () => {
          //         res.send("done");
          //       }
          //     );
          //   }
          //   break;

          case applicationStatuses.DEBIT_ORDER_AGREEMENT:
            {
              let messageId = "";

              if (messageData == "Yes, I agree") {
                messageId = messages.ID_UPLOAD_MESSAGE;

                const payload = {
                  Status: applicationStatuses.IDENTIFICATION_DOC_UPLOAD,
                };

                handleUpdateOnStatusAndSendDynamicMessage(
                  whatsAppId,
                  payload,
                  messageId
                ).finally(() => {
                  res.send("done");
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

          default: {
            console.log("On default");
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
        ". Error details: "
        // error
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
                Status: applicationStatuses.POPIA_AGREEMENT,
              };

              handleUpdateOnStatus(
                whatsAppId,
                payload,
                templates.POPIA_AGREEMENT
              )
                .finally(() => {
                  return handleUpdateOnStatus(
                    whatsAppId,
                    payload,
                    templates.THANK_YOU
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

          case applicationStatuses.MARITUS_STATUS_PROMPT:
            {
              if (interactiveReply.list_reply.id === "jslsajsjdj3h37e3") {
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

          case applicationStatuses.EMPLOYMENT_DETAILS_PROMP_TWO:
            {
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
            }

            break;

          case applicationStatuses.BANK_DETAILS_PROMPT_TWO: {
            const payload = {
              Status: applicationStatuses.BANK_DETAILS_PROMPT_THREE,
            };

            Promise.all([
              dbHandler.updateApplicationMetaData(whatsAppId, payload),
              sendDyamicMessage(whatsAppId, messages.BANK_DETAILS_PROMPT_THREE),
            ]).finally(() => {
              res.send("done");
            });
          }

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
