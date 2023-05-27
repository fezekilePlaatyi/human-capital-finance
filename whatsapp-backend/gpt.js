const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// async () => {
//   const response = await
openai
  .createCompletion({
    model: "text-davinci-003",
    prompt:
      // "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
      // "Given the input I love learning science and exploring nature., find the index in the array ['learn science', 'drink alcohol', 'other activities'] that matches the input: I love learning science and exploring nature.",
      "Scenario: You have an array of topics that have made significant impacts in their respective fields. The array contains ['computer science', 'space exploration', 'medical advancements']. You want to determine which topic is most associated with the breakthroughs of the 20th century. Question: Among the topics of computer science, space exploration, and medical advancements, which one is most closely associated with the groundbreaking developments of the 20th century?",
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  })
  .then((results) => {
    console.log(results.data);
  })
  .catch((error) => {
    console.log(error.data);
  });
// };
