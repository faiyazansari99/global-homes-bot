export default async function handler(req, res) {
  // CORS allow
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ reply: 'Method not allowed' });

  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) return res.status(500).json({ reply: 'Server Error: GROQ_API_KEY missing in Vercel' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message empty hai' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { 
            role: 'system', 
            content: 'You are Global Homes Luxury Assistant. You help clients find luxury properties in Dubai, London, New York. Talk in Hinglish, short, friendly, professional. Ask budget, location, bedrooms. Never say you are AI.' 
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return res.status(500).json({ reply: 'Groq Error: ' + data.error.message });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: 'Server Error: ' + err.message });
  }
}
