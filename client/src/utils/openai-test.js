const OpenAI = require('openai');

const openai = new OpenAI({apiKey: ''});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        
        { role: "system", content: "I teach 9th Grade Science. What are some skills, standards, and objectives that my students might struggle with? Format your answer as a bullet point list, with each point being no longer than 10 words" },
    
    ],
    
  });

  console.log(completion.choices[0]);
}

main();
