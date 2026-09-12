export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'Only POST' });

  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) return res.status(500).json({ reply: 'API Key nahi laga Vercel me' });

  const { message } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are Global Homes Assistant. You help find luxury properties in Dubai, London, New York. Reply in Hinglish, friendly and short.' },
          { role: 'user', content: message }
        ],
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ reply: 'Groq Error: ' + data.error.message });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ reply: 'Error: ' + err.message });
  }
}
