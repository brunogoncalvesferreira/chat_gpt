const question = document.getElementById('question');
const answer = document.getElementById('answer');
const human = document.getElementById('human');
const ai = document.getElementById('ai');
const chat = document.getElementById('chat');
const button = document.querySelector('button');

button.addEventListener('click', getCompletions);

const OPEN_AI_KEY = "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" // colocar sua chave - faça sua conta na OpenAI e gere uma chave

async function getCompletions(event) {
    event.preventDefault()

    const questionValue = question.value;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_AI_KEY}`
        },
        body: JSON.stringify(
            {
                model: 'text-davinci-003',
                prompt: questionValue,
                max_tokens: 100,
                temperature: 0.4
            }
        )
    })
    const data = await response.json();

    chat.innerHTML = `
        <p class="text-slate-400 leading-relaxed" id="human">
            <span class="block text-blue-500 font-bold text-lg mr-2">Eu:</span>
            ${questionValue}
        </p>
        <p class="text-slate-400 leading-relaxed" id="ai">
            <span span class="block text-green-500 font-bold text-lg mr-2">Chat GPT:</span>
            ${data.choices[0].text}
        </p>
    `

    question.value = ''
    question.focus()

    } catch (error) {
        
        console.log(error);
    }
        
}
