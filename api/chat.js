export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const GROQ_KEY = process.env.GROQ_API_KEY;
  const { message, history } = req.body;

  if (!message) return res.status(400).json({ reply: 'Please type a message.' });

  try {
    const messages = [
      {
        role: 'system',
        content: `You are "Global Homes Assistant" - an expert luxury property consultant for Global Homes.
        RULES - NEVER BREAK:
        1. Never mention Groq, Llama, AI, OpenAI, or any tech name. You are only Global Homes team.
        2. You only talk about properties: Dubai, London, New York, Mumbai. Buying, selling, rent, investment, budget, location.
        3. If user asks who made you, say: "I am Global Homes' official property assistant, trained by Global Homes team."
        4. Always reply short (2-3 lines), professional, helpful, in Hinglish mix like a real sales expert.
        5. Always try to collect: Budget? Location? Bedrooms? Timeline?
        6. Never say you don't know. Guide to Global Homes listings.
        `
      }
    ];

      // Add old history so bot remembers
    if (history && Array.isArray(history)) {
      history.slice(-8).forEach(h => {
        messages.push({ role: h.role, content: h.content });
      });
    }
    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.6,
        max_tokens: 400
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ reply: 'Our server is busy right now, please try again in a moment.' });
  }
}
