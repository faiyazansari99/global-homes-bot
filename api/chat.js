export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, image, mimeType } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ reply: "API Key missing in Vercel Settings!" });
    }

    try {
        const systemInstruction = {
            parts: [{ text: `Aap 'Global Homes' real estate company ke professional AI Sales Assistant hain. 
            
            Aapka kaam:
            1. Customer ko warmly greet karo (Hinglish mein).
            2. Ek-ek karke ye details poochho: (a) Budget, (b) Preferred Location, (c) BHK (1/2/3/4), (d) Possession time.
            3. Uske jawab ke hisaab se yahan se best property suggest karo:
               - 1BHK Thane: 45 Lakh
               - 2BHK Andheri: 85 Lakh
               - 3BHK Bandra: 2.5 Crore
               - 4BHK Juhu: 5 Crore
               - 2BHK Pune (Hinjewadi): 65 Lakh
            4. Jab customer property mein interested ho, toh uska "Naam" aur "Phone Number" maango.
            5. Phone number milne ke baad bolo: "Thank you [Naam] ji! Hamari sales team 10 minute mein aapko call karegi. Aur koi property dekhni hai?"
            6. Sirf real estate ki baat karo. Baaki kisi topic pe jawab mat do.
            7. Hamesha professional, short aur Hinglish mein jawab do.` }]
        };

        const parts = [];
        parts.push({ text: message });

        if (image) {
            parts.push({
                inline_data: {
                    mime_type: mimeType || "image/jpeg",
                    data: image
                }
            });
        }

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify({
                    system_instruction: systemInstruction,
                    contents: [{ parts: parts }]
                })
            }
        );

        const data = await response.json();

        if (data.candidates && data.candidates[0]) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply });
        } else {
            const errorMessage = data.error?.message || "Gemini API Error";
            return res.status(500).json({ reply: "API Error: " + errorMessage });
        }

    } catch (error) {
        return res.status(500).json({ reply: "Server Error: " + error.message });
    }
}
