const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors())

app.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message)
    return res.status(400).json({ message: "Please provide a message" });
  try {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion("text-davinci-002", {
      prompt: `Correct this to standard English: ${message}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).send(response.data.choices[0].text);
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
