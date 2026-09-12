// ⚠️ HAR CLIENT KE LIYE SIRF YE OBJECT CHANGE KARO
const CLIENT_CONFIG = {
    // Business Info
    businessName: "Global Homes",
    businessTagline: "Aapka Sapna, Hamari Zimmedari",
    businessType: "Real Estate",
    
    // Contact Info
    whatsappNumber: "971501234567", // Country code ke saath, + nahi
    phoneNumber: "+971501234567",
    email: "info@globalhomes.ae",
    address: "Business Bay, Dubai, UAE",
    
    // Lead Capture (Formspree se milega)
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
    
    // Services / Menu
    services: `
    Available Properties:
    - 1BHK Thane: 45 Lakh
    - 2BHK Andheri: 85 Lakh
    - 3BHK Bandra: 2.5 Crore
    - 4BHK Juhu: 5 Crore
    - 2BHK Pune (Hinjewadi): 65 Lakh
    `,
    
    // Quick Reply Buttons (chat ke neeche dikhenge)
    quickReplies: ["💰 Budget", "📍 Location", "🏠 2BHK", "📞 Contact"],
    
    // System Prompt (AI ka behaviour)
    systemPrompt: `You are a professional AI Sales Assistant for {businessName}, a {businessType} company.

Your job:
1. Warmly greet customers in Hinglish.
2. Ask one-by-one: (a) Budget, (b) Preferred Location, (c) BHK, (d) Possession time.
3. Based on their answers, suggest best property from: {services}
4. When customer is interested, ask for their "Name" and "Phone Number".
5. After getting phone number, say: "Thank you [Name] ji! Our team will call you in 10 minutes."
6. Only talk about real estate. Don't answer unrelated topics.
7. Keep replies short, professional, and in Hinglish.
8. If customer sends an image, analyze it and respond accordingly.`
};
