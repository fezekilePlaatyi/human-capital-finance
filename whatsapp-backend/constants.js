const applicationStatuses = {
  START: "START",
  REQUIRED_DOCS_CONFIRMATION: "REQUIRED_DOCS_CONFIRMATION",
  CITIZENSHIP_CONFIRMATION: "CITIZENSHIP_CONFIRMATION",
  IDENTIFICATION_PROMPT: "IDENTIFICATION_PROMPT",
  BASIC_INFO_PROMPT: "BASIC_INFO_PROMPT",
  CONFIRM_EMPLOYEE_NUMBER: "CONFIRM_EMPLOYEE_NUMBER",
  EMPOLOYEE_NUMBER_PROMPT: "EMPOLOYEE_NUMBER_PROMPT",
  FULL_EMPLOYER_DETAILS: " FULL_EMPLOYER_DETAILS",
  PARTIAL_EMPLOYER_DETAILS: "PARTIAL_EMPLOYER_DETAILS",
  SALARY_INFO_PROMPT: "SALARY_INFO_PROMPT",
  LOAN_AMOUNT: "LOAN_AMOUNT",
  LOAN_PERIOD: "LOAN_PERIOD",
  BANK_DETAILS_PROMPT: "BANK_DETAILS_PROMPT",
  DEBIT_ORDER_AGREEMENT: "DEBIT_ORDER_AGREEMENT",
  IDENTIFICATION_DOC_UPLOAD: "IDENTIFICATION_DOC_UPLOAD",
  PROOF_OF_RESIDENCE: "PROOF_OF_RESIDENCE",
  PERMIT_DOC: "PERMIT_DOC",
  BANK_STATMENT_DOC: "BANK_STATMENT_DOC",
  POPIA_AGREEMENT: "POPIA_AGREEMENT",
  THANK_YOU: "THANK_YOU",
};

const templates = {
  WELCOME: "welcome_temp",
  REQUIRED_DOCS_CONFIRMATION: "required_docx_temp",
  CITIZENSHIP_CONFIRMATION: "citizen_temp",
  PASSPORT_NUMBER_PROMPT: "passport_number_temp",
  ID_NUMBER_PROMPT: "id_number_temp",
  BASIC_INFO_PROMPT: "basic_info_temp",
  CONFIRM_EMPLOYEE_NUMBER: "have_employee_number_temp",
  EMPOLOYEE_NUMBER_PROMPT: "employee_number_temp",
  EMPOLOYEE_DETAILS_PROMPT: "employer_info_temp",
  FULL_EMPLOYER_DETAILS: "employer_details_temp",
  PARTIAL_EMPLOYER_DETAILS: "employer_info2_temp",
  SALARY_INFO_PROMPT: "salary_info_temp",
  LOAN_AMOUNT: "how_much_temp",
  LOAN_PERIOD: "loan_period_temp",
  DEBIT_ORDER_AGREEMENT: "debit_agreement_temp",
  UPLOAD_ID_DOC: "id_upload_temp",
  UPLOAD_PASSPORT_DOC: "passport_upload_temp",
  PROOF_OF_RESIDENCE: "proof_of_residence_temp",
  PERMIT_DOC: "permit_upload_temp",
  BANK_STATMENT_DOC: "bank_statement_upload_temp",
  POPIA_AGREEMENT: "popia_agreement_temp",
  THANK_YOU: "thank_you_temp",
};

const messages = {
  BANK_DETAILS_MESSAGE: `*Banking Information*\n\nPlease respond with the information\n\n 1. Bank Name\n2. Account Number\n 3. Account Holder\n4. Account Type\n\n\`\`\`Step 4/5\`\`\``,
  SUPPORTING_DOCS_NOTE: `*Supporting Documents*\n\nPlease note: only PDFs and images are allowed\n\n\`\`\`Step 4/5\`\`\``,
  ID_UPLOAD_MESSAGE: `Please upload a copy of your *ID Document*.\n\n\`\`\`Document - 1/3 \`\`\``,
  PASSPORT_UPLOAD_MESSAGE: `Please upload a copy of your *Passport*.\n\n\`\`\`Document - 1/3 \`\`\``,
  DEBIT_ORDER_MUST_BE_AGREED_MESSAGE: `*Dear user*, Please kindly note to procceed with Application you have to accept you agree to be debited.`,
};

const genericConsts = {
  IS_SOUTH_AFRICAN: "IS_SOUTH_AFRICAN",
  IS_NON_SOUTH_AFRICAN: "IS_NON_SOUTH_AFRICAN",
};

module.exports = {
  applicationStatuses: applicationStatuses,
  templates: templates,
  messages: messages,
  genericConsts: genericConsts,
};
