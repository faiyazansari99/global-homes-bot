export default async function handler(req, res) {
  const { message, history = [] } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are Global Homes luxury property assistant. Friendly, human, short reply (30 words max). Never repeat user's word. Ask budget & location. Reply in user's language." },
         ...history.slice(-6),
          { role: "user", content: message }
        ],
        temperature: 0.8
      })
    });
    const d = await r.json();
    if (d.error) return res.status(200).json({ reply: "Groq Error: " + d.error.message });
    return res.status(200).json({ reply: d.choices[0].message.content });
  } catch (e) {
    return res.status(200).json({ reply: "Server Error: " + e.message });
  }
}
