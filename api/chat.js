export default async function handler(req, res){
  if(req.method!== 'POST') return res.status(405).end();
  const { message } = req.body;
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{ "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are Global Homes AI. Ask user's location first (Dubai/UK/US/India). Then help with property as per budget. Always try to collect name and WhatsApp for site visit. Be friendly." },
        { role: "user", content: message }
      ]
    })
  });
  const d = await r.json();
  res.json({ reply: d.choices[0].message.content });
}
