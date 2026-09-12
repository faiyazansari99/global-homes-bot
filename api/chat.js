export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, config } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ reply: "Groq API Key missing in Vercel Settings!" });
    }

    try {
        // System prompt mein client ki details bhar do
        let finalPrompt = config.systemPrompt
            .replace(/{businessName}/g, config.businessName)
            .replace(/{businessType}/g, config.businessType)
            .replace(/{services}/g, config.services)
            .replace(/{whatsappNumber}/g, config.whatsappNumber)
            .replace(/{email}/g, config.email)
            .replace(/{address}/g, config.address);

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile", // Fast + Smart + Sasta
                    messages: [
                        { role: "system", content: finalPrompt },
                        { role: "user", content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            }
        );

        const data = await response.json();

        if (data.choices && data.choices[0]) {
            const reply = data.choices[0].message.content;
            return res.status(200).json({ reply });
        } else {
            const errorMessage = data.error?.message || "Groq API Error";
            return res.status(500).json({ reply: "API Error: " + errorMessage });
        }

    } catch (error) {
        return res.status(500).json({ reply: "Server Error: " + error.message });
    }
}
