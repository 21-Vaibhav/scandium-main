import { Pinecone } from "@pinecone-database/pinecone";
import { pineconeApiKey } from "./utils/environment.js";

const users: {
  id: string;
  name: string;
  text: string;
}[] = [
  { id: "1", name: "Steve Jobs", text: "Founder of Apple, tech mogul, and design visionary" },
  { id: "2", name: "Marie Curie", text: "Pioneer in radioactivity, first woman to win a Nobel Prize" },
  { id: "3", name: "Leonardo da Vinci", text: "Renaissance polymath, painter of the Mona Lisa" },
  { id: "4", name: "Nelson Mandela", text: "Anti-apartheid hero and former president of South Africa" },
  { id: "5", name: "Ada Lovelace", text: "First computer programmer and visionary mathematician" },
  { id: "6", name: "Elon Musk", text: "Founder of SpaceX and Tesla, reshaping the future" },
  { id: "7", name: "Albert Einstein", text: "Father of relativity, transformed modern physics" },
  { id: "8", name: "Frida Kahlo", text: "Mexican painter known for raw, powerful self-portraits" },
  { id: "9", name: "Alan Turing", text: "Codebreaker, father of modern computing" },
  { id: "10", name: "Serena Williams", text: "Tennis icon and advocate for women in sports" },
  { id: "11", name: "Mahatma Gandhi", text: "Leader of Indian independence through non-violence" },
  { id: "12", name: "Nikola Tesla", text: "Inventor of AC electricity and wireless technology" },
  { id: "13", name: "Malala Yousafzai", text: "Youngest Nobel laureate, advocate for girls' education" },
  { id: "14", name: "Jeff Bezos", text: "Founder of Amazon, redefined e-commerce and logistics" },
  { id: "15", name: "Katherine Johnson", text: "NASA mathematician who helped send humans to space" },
  { id: "16", name: "Pablo Picasso", text: "Cubism pioneer, one of the most influential artists of the 20th century" },
  { id: "17", name: "Sheryl Sandberg", text: "COO of Facebook, advocate for women in leadership" },
  { id: "18", name: "Stephen Hawking", text: "Physicist who explained black holes and the universe" },
  { id: "19", name: "Tim Berners-Lee", text: "Inventor of the World Wide Web" },
  { id: "20", name: "Greta Thunberg", text: "Global climate activist and youth icon" },
  { id: "21", name: "Satoshi Nakamoto", text: "Mysterious creator of Bitcoin, redefined money" },
  { id: "22", name: "Rosalind Franklin", text: "Key figure in discovering the DNA double helix" },
  { id: "23", name: "Barack Obama", text: "44th US President, symbol of hope and change" },
  { id: "24", name: "Oprah Winfrey", text: "Media mogul and philanthropist inspiring millions" },
  { id: "25", name: "Usain Bolt", text: "World's fastest man, Olympic legend" },
  { id: "26", name: "Mark Zuckerberg", text: "Co-founder of Facebook, changed social interaction" },
  { id: "27", name: "Angela Merkel", text: "Chancellor of Germany, leader through crises" },
  { id: "28", name: "Linus Torvalds", text: "Creator of Linux and Git, tech backbone architect" },
  { id: "29", name: "Jane Goodall", text: "Primatologist who transformed our view of animals" },
  { id: "30", name: "Rihanna", text: "Pop icon and billionaire beauty entrepreneur" },
  { id: "31", name: "Yayoi Kusama", text: "Avant-garde artist known for polka dots and infinity rooms" },
  { id: "32", name: "Sachin Tendulkar", text: "Legendary Indian cricketer known as the 'Little Master'" },
  { id: "33", name: "Jacinda Ardern", text: "Former New Zealand PM, known for empathetic leadership" },
  { id: "34", name: "Larry Page", text: "Co-founder of Google, reshaped the internet" },
  { id: "35", name: "Amal Clooney", text: "Human rights lawyer advocating global justice" },
  { id: "36", name: "Zaha Hadid", text: "Architect who broke every rule in design" },
  { id: "37", name: "Cristiano Ronaldo", text: "Football legend and global sports brand" },
  { id: "38", name: "Noam Chomsky", text: "Linguist, philosopher, and political dissident" },
  { id: "39", name: "Indira Gandhi", text: "India's first woman Prime Minister, formidable leader" },
  { id: "40", name: "Beyoncé", text: "Cultural force in music, business, and activism" },
];

const pc = new Pinecone({
  apiKey: pineconeApiKey,
});

try {
  const index = pc.index("scandium");
  const namespace = index.namespace("users");

  // 1. Create
  await namespace.upsertRecords(users);

  // 2. Read
  const technologists = await namespace.searchRecords({
    query: {
      inputs: {
        text: "Top technologists of all time",
      },
      topK: 10,
    },
  });

  technologists.result.hits.forEach((hit) => {
    console.log(hit, hit._score);
  });

  // 3. Update
  await namespace.upsertRecords([
    {
      id: "4",
      text: "Led South Africa out of apartheid and became its first Black president",
    },
  ]);

  // 4. Delete
  namespace.deleteOne("30");
} catch (e) {
  console.log(e);
}
