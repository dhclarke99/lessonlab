const OpenAI = require('openai');

const openai = new OpenAI({apiKey: ''});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        
        { role: "system", content: "what was said before that?" },
    
    ],
    
  });

  console.log(completion.choices[0]);
}

main();
