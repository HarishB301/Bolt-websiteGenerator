const{
    GoogleGenerativeAI,

} = require("@google/generative-ai")

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
    model:'gemini-3-flash-preview',
})

const generationConfig={
    temperature:1,
    topP:0.95,
    topK:40,
    maxOutputTokens:8192,
    responseMimeType:"text/plain"
};

const CodegenerationConfig={
    temperature:1,
    topP:0.95,
    topK:40,
    maxOutputTokens:8192,
    responseMimeType:"application/json"
};

export const createChatSession = () => {
  return model.startChat({
    generationConfig,
    history: [
      {
      role:'user',
      parts:[
        {text:"Generate to do app : Generate a Project in React. Create multiple components"}
      ]
    },{
      role:'model',
     parts: [
          {
            text: `\`\`\`json
{
  "projectTitle": "Simple To-Do App",
  "description": "A React-based To-Do application with multiple components like Header, FilterBar, stats,TodoInput,TodoItem,and TodoList.",
  "components": [
    "Header",
    "FilterBar",
    "stats",
    "TodoInput",
    "TodoItem",
    "TodoList"
  ]
}
\`\`\``
          }
        ]
    }
    ],
  });
};

export const GenAiCode = model.startChat({
  generationConfig:CodegenerationConfig,
  history:[
    
  ]
})