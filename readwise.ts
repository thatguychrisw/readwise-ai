import OpenAI from "openai";
import readlineSync from "readline-sync";
import axios from "axios";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const READWISE_API_KEY = process.env.READWISE_API_KEY;

if (!OPENAI_API_KEY || !READWISE_API_KEY) {
  console.error("❌ Missing required API keys.");
  process.exit(1);
}

// Initialize OpenAI API
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function askGPT(prompt: string): Promise<{ answer: string; keyTakeaways: string[]; memoryHook: string }> {
  console.log("🔍 Sending prompt to OpenAI...");
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" }, // Ensure structured JSON output
      messages: [
        {
          role: "user",
          content: `Provide a structured JSON response for this query:
          - full_answer: A detailed but concise response to the query, no more than 3 sentences.
          - key_takeaways: An array of 3-5 key bullet points summarizing the answer.
          - memory_hook: A visualization or mnemonic to help recall the information.

          Query: "${prompt}"
          `,
        },
      ],
      max_tokens: 700,
    });

    const jsonData = response.choices[0]?.message?.content;
    if (!jsonData) throw new Error("No structured response received.");

    const parsedResponse = JSON.parse(jsonData);
    console.log("✅ Response received from OpenAI.", parsedResponse);

    return {
      answer: parsedResponse.full_answer || "N/A",
      keyTakeaways: parsedResponse.key_takeaways || [],
      memoryHook: parsedResponse.memory_hook || "N/A",
    };
  } catch (error) {
    console.error("❌ Error fetching response from OpenAI:", error);
    return { answer: "Error: Could not retrieve response.", keyTakeaways: ["N/A"], memoryHook: "N/A" };
  }
}

function generateRecallNotes(prompt: string, keyTakeaways: string[], memoryHook: string) {
  const formattedTakeaways = keyTakeaways.map((point) => `- ${point}`).join("\n");

  return {
    title: `${prompt}`,
    note: `🔑 Key Takeaways:\n${formattedTakeaways}\n\n🧠 Memory Hook:\n${memoryHook}`,
  };
}

async function sendToReadwise(prompt: string, answer: string, keyTakeaways: string[], memoryHook: string) {
  console.log("📤 Sending to Readwise API...");

  const recallData = generateRecallNotes(prompt, keyTakeaways, memoryHook);

  const payload = {
    highlights: [
      {
        text: answer,
        title: recallData.title,
        source_url: "https://chat.openai.com",
        note: recallData.note,
        author: "OpenAI",
      },
    ],
  };

  try {
    const response = await axios.post("https://readwise.io/api/v2/highlights/", payload, {
      headers: {
        Authorization: `Token ${READWISE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("✅ Successfully sent to Readwise!");
    } else {
      console.error("❌ Failed to send to Readwise:", response.data);
    }
  } catch (error) {
    console.error("❌ Error sending to Readwise:", error.response?.data || error.message);
  }
}

async function getUserDecision(prompt: string, answer: string, keyTakeaways: string[], memoryHook: string) {
  const recallData = generateRecallNotes(prompt, keyTakeaways, memoryHook);

  while (true) {
    console.log("\n📌 **Optimized Highlight for Readwise:**");
    console.log(recallData.note);

    const action = readlineSync.question("Do you want to (k)eep, (r)etry, or (c)ancel? ").toLowerCase();

    if (action === "k") {
      console.log("📥 Keeping the response and sending to Readwise...");
      await sendToReadwise(prompt, answer, keyTakeaways, memoryHook);
      break;
    } else if (action === "r") {
      console.log("🔄 Retrying...");
      return true;
    } else if (action === "c") {
      console.log("🚫 Cancelled.");
      break;
    } else {
      console.log("❌ Invalid input. Please enter 'k' for keep, 'r' for retry, or 'c' for cancel.");
    }
  }
  return false;
}

async function main() {
  const prompt = process.argv.slice(2).join(" ");
  if (!prompt) {
    console.error("❌ Please provide a prompt.");
    process.exit(1);
  }

  console.log(`📜 Received prompt: "${prompt}"`);

  let retry = true;
  while (retry) {
    const { answer, keyTakeaways, memoryHook } = await askGPT(prompt);
    console.log("\n📝 GPT Response:\n" + answer + "\n");

    retry = await getUserDecision(prompt, answer, keyTakeaways, memoryHook);
  }
}

main().catch(console.error);
