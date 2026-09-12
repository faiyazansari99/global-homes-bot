export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({reply: "Method not allowed"});
  const { message } = req.body;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {role: "system", content: "You are Global Homes luxury real estate assistant. Reply short, professional, friendly. Always ask budget, location, WhatsApp. If user says name, reply with name. Reply in user's language (Hindi/English)."},
          {role: "user", content: message}
        ],
        max_tokens: 250,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error ||!data.choices) {
      console.log("DEEPSEEK ERROR:", data);
      return res.status(200).json({ reply: `Hi ${message} 👋! I am from Global Homes. Please share your budget and location?` });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (e) {
    console.log("ERROR:", e);
    return res.status(200).json({ reply: "Hi! Please share your budget & location, our team will help you instantly! 🏠" });
  }
}
