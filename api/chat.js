export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ reply: "Method not allowed" });
  const { message, history = [] } = req.body;

  // GOLDEN RULE: Naam code me
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) return res.status(200).json({ reply: "Config Error: GROQ_API_KEY not found in Vercel" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are Global Homes luxury property assistant. Friendly, human, short reply (30 words max). Never repeat user's word. Ask budget & location. Reply in user's language." },
         ...history.slice(-6),
          { role: "user", content: message }
        ],
        temperature: 0.8
      })
    });
    const data = await response.json();
    if (data.error) return res.status(200).json({ reply: "Groq Error: " + data.error.message });
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (e) {
    return res.status(200).json({ reply: "Server Error: " + e.message });
  }
}
