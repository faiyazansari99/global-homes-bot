export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, config, history, image, mimeType } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return res.status(500).json({ reply: "Groq API Key missing!" });
    if (!config) return res.status(500).json({ reply: "Config missing!" });

    try {
        let finalPrompt = config.systemPrompt
            .replace(/{businessName}/g, config.businessName || "")
            .replace(/{businessType}/g, config.businessType || "")
            .replace(/{services}/g, config.services || "")
            .replace(/{whatsappNumber}/g, config.whatsappNumber || "")
            .replace(/{email}/g, config.email || "")
            .replace(/{address}/g, config.address || "");

        // Build messages array
        const messages = [{ role: "system", content: finalPrompt }];

        if (history && history.length > 0) {
            history.forEach(msg => {
                messages.push({ role: msg.role, content: msg.content });
            });
        }

        // Agar image hai toh vision format use karo
        if (image) {
            messages.push({
                role: "user",
                content: [
                    { type: "text", text: message || "Is image ko analyze karo" },
                    { type: "image_url", image_url: { url: `data:${mimeType || 'image/jpeg'};base64,${image}` } }
                ]
            });
        } else {
            messages.push({ role: "user", content: message });
        }

        // Model choose karo: image hai toh vision, warna normal
        const model = image 
            ? "meta-llama/llama-4-scout-17b-16e-instruct" 
            : "openai/gpt-oss-120b";

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500
                })
            }
        );

        const data = await response.json();

        if (!data.choices || !data.choices[0]) {
            const errMsg = data.error?.message || "Groq API Error";
            return res.status(500).json({ reply: "API Error: " + errMsg });
        }

        const reply = data.choices[0].message.content;

        // ⭐ LEAD CAPTURE: Agar reply mein phone number detect ho, toh email bhejo
        const fullText = message + " " + reply;
        const phoneMatch = fullText.match(/(\+?\d[\d\s\-]{8,14}\d)/);
        
        if (phoneMatch && config.formspreeEndpoint && !config.formspreeEndpoint.includes("YOUR_FORM_ID")) {
            try {
                await fetch(config.formspreeEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        lead_name: "New Lead",
                        phone: phoneMatch[0],
                        business: config.businessName,
                        chat_summary: fullText.substring(0, 300),
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (e) { console.log("Formspree error:", e.message); }
        }

        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(500).json({ reply: "Server Error: " + error.message });
    }
}
