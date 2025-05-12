import { Pinecone } from "@pinecone-database/pinecone";
import { pineconeApiKey } from "./utils/environment.js";
import { Mistral } from "@mistralai/mistralai";
import { mistralApiKey } from "./utils/environment.js";

const query = "tell me about the top technologists of all time";

const pc = new Pinecone({
  apiKey: pineconeApiKey,
});

const namespace = pc.index("scandium").namespace("users");

const pineconeResponse = await namespace.searchRecords({
  query: {
    topK: 10,
    inputs: {
      text: query,
    },
  },
  rerank: {
    model: "bge-reranker-v2-m3",
    topN: 5,
    rankFields: ["text"],
  },
});

const technologists = pineconeResponse.result.hits.map((hit) => {
  const fields = hit.fields as {
    text: string;
    name: string;
  };
  return `Name: ${fields.name}, Text: ${fields.text}`;
});

const mistral = new Mistral({
  apiKey: mistralApiKey,
});

const updatedQuery = `Based on the following information, ${query}:\n\n${technologists.join(
  "\n"
)}`;

const mistralResponse = await mistral.chat.complete({
  model: "mistral-large-latest",
  messages: [
    {
      role: "user",
      content: updatedQuery,
    },
  ],
});

if (mistralResponse?.choices?.length) {
  console.log(mistralResponse.choices[0].message.content);
} else {
  console.log("No content available");
}
