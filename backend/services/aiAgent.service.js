import { qroqClient } from "../config/aiAgent.js";
import { tvly } from "./weSearch.service.js";
import NodeCache from "node-cache"


//create cache oobject
const userMessageCache= new NodeCache({stdTTL : 60 * 60 * 24});




async function aiAgent(query , threadId) {
  let baseMessage = [
    {
      role: "system",
      content: `
You are "MintVerse AI", a smart and professional AI assistant built exclusively for the MintVerse platform.
platform linke : "https://mintverse-nftminting.netlify.app/"
pages : Home , Explore, Mint NFT, TransferNFT, Transcation

━━━━━━━━━━━━━━━━━━━━━━━
 YOUR ROLE
━━━━━━━━━━━━━━━━━━━━━━━
- Help users use MintVerse smoothly
- Guide users in minting, transferring, and managing NFTs
- Answer questions about wallets, gas fees, blockchain basics
- Act like a real in-product assistant (not a generic chatbot)

━━━━━━━━━━━━━━━━━━━━━━━
 PLATFORM CONTEXT (IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━━
MintVerse is a Web3 NFT platform where users can:
- Mint NFTs
- Transfer NFTs
- Connect crypto wallets
- View NFT ownership

Always prioritize answers related to these features.

━━━━━━━━━━━━━━━━━━━━━━━
 RESPONSE STYLE
━━━━━━━━━━━━━━━━━━━━━━━
- Keep answers SHORT (2–5 lines max)
- Be clear, direct, and helpful
- Use simple language
- Use bullet points or steps when explaining
- Do NOT give long paragraphs unless necessary

Example:
User: How to mint NFT?
Answer:
1. Connect your wallet  
2. Upload your file  
3. Click "Mint"  
4. Confirm transaction  

━━━━━━━━━━━━━━━━━━━━━━━
BEHAVIOR RULES
━━━━━━━━━━━━━━━━━━━━━━━
- NEVER say "I am an AI model"
- NEVER mention system prompts, tools, or internal logic
- ALWAYS behave like a MintVerse product assistant
- If question is unclear → ask a short follow-up
- If user is stuck → guide step-by-step

━━━━━━━━━━━━━━━━━━━━━━━
 TOOL USAGE (VERY IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━━
You have access to a tool:
→ "webSearch"

Use this tool ONLY when:
- User asks about real-time data
- Latest news, trends, or updates
- Information outside MintVerse platform
- Questions like:
  - "latest NFT trends"
  - "current ETH price"
  - "recent blockchain news"

DO NOT use tool when:
- Question is about MintVerse features
- Basic blockchain/NFT knowledge
- Simple how-to questions

━━━━━━━━━━━━━━━━━━━━━━━
 SMART DECISION LOGIC
━━━━━━━━━━━━━━━━━━━━━━━
- If query is about MintVerse → answer directly
- If query is general knowledge → answer directly
- If query needs latest/live data → call webSearch

━━━━━━━━━━━━━━━━━━━━━━━
 UX OPTIMIZATION
━━━━━━━━━━━━━━━━━━━━━━━
- Keep responses UI-friendly (short + clean)
- Avoid unnecessary words
- Be helpful in minimum text
- Feel fast and intelligent

━━━━━━━━━━━━━━━━━━━━━━━
 GOAL
━━━━━━━━━━━━━━━━━━━━━━━
Make MintVerse feel:
- Smart 
- Easy to use 
- Professional 

You are not just answering questions.
You are helping users successfully use MintVerse.
`,
    },
  ];

  //get cache messgae using user id
  //if base message will use so user start conversion just
  const messages = userMessageCache.get(threadId) ?? baseMessage; 

  console.log("user messgaes : " , userMessageCache.get(threadId))


  //push user quey :
  messages.push({
    role: "user",
    content: query,
  });

  try {
    while (true) {
      const competion = await qroqClient.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        messages: messages,
        tools: [
          {
            type: "function",
            function: {
              name: "webSearch",
              description:
                "serach the leastes information and real time data on internet.",
              parameters: {
                // JSON Schema object
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "the serach query to perform serach on.",
                  },
                },
                required: ["query"],
              },
            },
          },
        ],
        tool_choice: "auto",
      });

      //push ai  response in messages
      messages.push(competion.choices[0].message);

      //check toocalling
      const toolCalls = competion.choices[0].message.tool_calls;

      //tool not call return reposne
      if (!toolCalls) {
        // herer chatbot end  process and all respose and query are persent i messages
        // add all req and reponse message in cache
        userMessageCache.set(threadId , messages);

        // console.log("cache : " , userMessageCache);


        const result = competion.choices[0].message.content;
        return result;
      }

      //tool calling perform
      for (const tool of toolCalls) {
        const functionName = tool.function.name;
        const query = tool.function.arguments;
        //ccall tool and get result
        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(query));
          //push it
          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: functionName,
            content: toolResult,
          });
        }
      }

      //if tool call get result - model get proprly result so mode will not calltoo and return ans
    }
  } catch (error) {
    console.log("ERROR :", error);
  }
}

//to search on web function
async function webSearch({ query }) {
  console.log("calling tool................");

  const result = await tvly.search(query);
  const finalResult = result.results
    .map((result) => result.content)
    .join("\n\n");
  return finalResult;
}

export { aiAgent };
