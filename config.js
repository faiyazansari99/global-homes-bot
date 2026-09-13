const CLIENT_CONFIG = {
    // Business Info
    businessName: "Global Homes",
    businessTagline: "Aapka Sapna, Hamari Zimmedari",
    businessType: "Real Estate",
    
    // Contact Info
    whatsappNumber: "971501234567",
    phoneNumber: "+971501234567",
    email: "info@globalhomes.ae",
    address: "Business Bay, Dubai, UAE",
    
    // ✅ LEAD CAPTURE ENDPOINTS (Configured!)
    formspreeEndpoint: "https://formspree.io/f/xqpkvddr",
    googleSheetUrl: "https://script.google.com/macros/s/AKfycbxYm7L0qZD_LJ_ihSOodMJ_HKu0JjU9gXvenXOi6csq-R3A1Brxb8TPC3gCwu4kiSFyGQ/exec",
    
    // Admin Page Password
    adminPassword: "admin123",
    
    // Services
    services: `
    Available Properties:
    - 1BHK Thane: 45 Lakh
    - 2BHK Andheri: 85 Lakh
    - 3BHK Bandra: 2.5 Crore
    - 4BHK Juhu: 5 Crore
    - 2BHK Pune (Hinjewadi): 65 Lakh
    `,
    
    quickReplies: ["💰 Budget", "📍 Location", "🏠 2BHK", "📞 Contact"],
    
    systemPrompt: `You are a professional AI Sales Assistant for {businessName}, a {businessType} company.
Your job:
1. Warmly greet customers in Hinglish.
2. Ask one-by-one: (a) Budget, (b) Preferred Location, (c) BHK, (d) Possession time.
3. Based on their answers, suggest best property from: {services}
4. When customer is interested, ask for their "Name" and "Phone Number".
5. After getting phone number, say: "Thank you [Name] ji! Our team will call you in 10 minutes."
6. Only talk about real estate. Don't answer unrelated topics.
7. Keep replies short, professional, and in Hinglish.`
};
