const applicationStatuses = {
  START: "START",
  EMPLOYER_SELECTION: "EMPLOYER_SELECTION",
  LOAN_PURPOSE: "LOAN_PURPOSE",
  CITIZENSHIP_CONFIRMATION: "CITIZENSHIP_CONFIRMATION",
  IDENTIFICATION_PROMPT: "IDENTIFICATION_PROMPT",
  PERSONAL_DETAILS_PROMPT: "PERSONAL_DETAILS_PROMPT",
  MARITUS_STATUS_PROMPT: "MARITUS_STATUS_PROMPT",
  EMPLOYMENT_DETAILS_PROMP_ONE: "EMPLOYMENT_DETAILS_PROMP_ONE",
  EMPLOYMENT_DETAILS_PROMP_TWO: "EMPLOYMENT_DETAILS_PROMP_TWO",
  EMPLOYMENT_DETAILS_PROMP_THREE: "EMPLOYMENT_DETAILS_PROMP_THREE",
  BANK_DETAILS_PROMPT_ONE: "BANK_DETAILS_PROMPT_ONE",
  BANK_DETAILS_PROMPT_TWO: "BANK_DETAILS_PROMPT_TWO",
  BANK_DETAILS_PROMPT_THREE: "BANK_DETAILS_PROMPT_THREE",
  DEBIT_ORDER_AGREEMENT: "DEBIT_ORDER_AGREEMENT",

  REQUIRED_DOCS_CONFIRMATION: "REQUIRED_DOCS_CONFIRMATION",
  CONFIRM_EMPLOYEE_NUMBER: "CONFIRM_EMPLOYEE_NUMBER",
  EMPOLOYEE_NUMBER_PROMPT: "EMPOLOYEE_NUMBER_PROMPT",
  FULL_EMPLOYER_DETAILS: " FULL_EMPLOYER_DETAILS",
  PARTIAL_EMPLOYER_DETAILS: "PARTIAL_EMPLOYER_DETAILS",
  SALARY_INFO_PROMPT: "SALARY_INFO_PROMPT",
  LOAN_AMOUNT: "LOAN_AMOUNT",
  LOAN_PERIOD: "LOAN_PERIOD",
  BANK_DETAILS_PROMPT: "BANK_DETAILS_PROMPT",
  IDENTIFICATION_DOC_UPLOAD: "IDENTIFICATION_DOC_UPLOAD",
  PROOF_OF_RESIDENCE: "PROOF_OF_RESIDENCE",
  PERMIT_DOC: "PERMIT_DOC",
  BANK_STATMENT_DOC: "BANK_STATMENT_DOC",
  POPIA_AGREEMENT: "POPIA_AGREEMENT",
  THANK_YOU: "THANK_YOU",
};

const templates = {
  WELCOME: "welcome_temp",
  LOAN_PURPOSE: "loan_purpose_temp",
  CITIZENSHIP_CONFIRMATION: "citizen_temp",
  PASSPORT_NUMBER_PROMPT: "passport_number_temp",
  ID_NUMBER_PROMPT: "id_number_temp",
  PERSONAL_DETAILS_PROMPT: "personal_details_temp",
  DEBIT_ORDER_AGREEMENT: "debit_agreement_temp",

  REQUIRED_DOCS_CONFIRMATION: "required_docx_temp",
  CONFIRM_EMPLOYEE_NUMBER: "have_employee_number_temp",
  EMPOLOYEE_NUMBER_PROMPT: "employee_number_temp",
  EMPOLOYEE_DETAILS_PROMPT: "employer_info_temp",
  FULL_EMPLOYER_DETAILS: "employer_details_temp",
  PARTIAL_EMPLOYER_DETAILS: "employer_info2_temp",
  SALARY_INFO_PROMPT: "salary_info_temp",
  LOAN_AMOUNT: "how_much_temp",
  LOAN_PERIOD: "loan_period_temp",
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
  EMPLOYMENT_DETAILS_HEADING: `*Employment Details*\n\nKindly provide answers to the following questions pertaining to your employment.\`\`\`\n\nStep 6/9\`\`\``,
  EMPLOYMENT_DETAILS_PROMP_ONE: `*Please provide us with details*\n\n1. Employee Number\n2. Date of Employment(dd/mm/yyyy)\n\n\`\`\`Example Response\`\`\`\n\n1. HCF12345\n2. 01/10/2020`,
  EMPLOYMENT_DETAILS_PROMP_THREE: `*Current Salary*\n\n1. Net income e.g \`\`\`5500\`\`\`\n2.Total expenses e.g \`\`\`650\`\`\`\n\n*Note:* Money units is in South African Rands`,
  BANK_DETAILS_PROMPT_THREE: `*Please enter your Account Number.*`,
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
