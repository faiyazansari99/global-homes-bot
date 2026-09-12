export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({reply: "Method not allowed"});

  const { message } = req.body;
  const key = process.env.GROQ_API_KEY;

  // Agar key nahi hai toh bhi busy nahi bolega, direct reply dega
  if (!key) {
    return res.status(200).json({
      reply: "Hi! 👋 Welcome to Global Homes. Tell me your budget & location? Example: 'Dubai 2BHK under $1.5M'"
    });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {role: "system", content: "You are Global Homes luxury property assistant. Be short, professional, ask budget, location, WhatsApp. Reply in user's language."},
          {role: "user", content: message}
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ reply: "Thanks! Please share your budget, location and WhatsApp number - our team will call you in 2 mins! 🏠" });
    }

    const reply = data.choices?.[0]?.message?.content || "Hi! Please share your budget and preferred location?";
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(200).json({ reply: "Hi there! 👋 Please tell me your budget and location, I'll show you best properties." });
  }
}
