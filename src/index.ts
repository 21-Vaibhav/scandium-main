import { Mistral } from "@mistralai/mistralai";
import { mistralApiKey } from "./utils/environment.js";


const mistral = new Mistral({
  apiKey: mistralApiKey
});

const response = await mistral.chat.complete({
  model: "mistral-large-latest",
  messages: [
    {
      role: "user",
      content: "What is the capital of France?"
    }
  ],
});

console.log(response.choices?.[0]?.message?.content ?? "No content available");