// ============================================
// GLOBAL HOMES - CONFIGURATION FILE
// ============================================

const CLIENT_CONFIG = {
    // Business Information
    businessName: "Global Homes",
    businessTagline: "Your Dream Home Awaits",
    businessType: "Real Estate",
    
    // Contact Information
    whatsappNumber: "919999999999",
    phoneNumber: "+91 99999 99999",
    email: "info@globalhomes.com",
    address: "Business Bay, Dubai, UAE",
    
    // Google Sheet Integration
    googleSheetUrl: "YOUR_APPS_SCRIPT_WEB_APP_URL",
    
    // Formspree Email Integration
    formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT",
    
    // Admin Dashboard Password
    adminPassword: "admin123",
    
    // Services or Properties List
    services: `
    Available Properties:
    - 1BHK Thane: 45 Lakh
    - 2BHK Andheri: 85 Lakh
    - 3BHK Bandra: 2.5 Crore
    - 4BHK Juhu: 5 Crore
    - 2BHK Pune (Hinjewadi): 65 Lakh
    `,
    
    // Quick Reply Buttons
    quickReplies: ["💰 Budget", "📍 Location", "🏠 2BHK", "📞 Contact"],
    
    // ============================================
    // AI MODEL SELECTION
    // ============================================
    aiProvider: "groq",
    aiModel: "openai/gpt-oss-120b",
    
    // ============================================
    // SUPPORTED LANGUAGES (4 Languages)
    // ============================================
    supportedLanguages: [
        "English",
        "Hindi",
        "Hinglish",
        "Arabic"
    ],
    
    // ============================================
    // AI SYSTEM PROMPT (Multi-Language + English Priority)
    // ============================================
    systemPrompt: `You are a professional AI Sales Assistant for {businessName}, a {businessType} company.

LANGUAGE RULES (Very Important):
- DEFAULT LANGUAGE is English. Always start the conversation in English.
- If the customer writes in English, reply in English.
- If the customer writes in Hindi, reply in Hindi.
- If the customer writes in Hinglish (Hindi + English mix), reply in Hinglish.
- If the customer writes in Arabic, reply in Arabic.
- If the customer writes in any other language, reply in English.
- Automatically detect the language from the customer's message.

BUSINESS RULES:
1. Warmly greet customers in English by default.
2. Ask one-by-one: (a) Budget, (b) Preferred Location, (c) BHK, (d) Possession time.
3. Based on their answers, suggest best property from: {services}
4. When customer is interested, ask for their "Name" and "Phone Number".
5. After getting phone number, say: "Thank you! Our team will call you in 10 minutes."
6. Only talk about real estate. Don't answer unrelated topics.
7. Keep replies short, professional, and friendly.

IMAGE & DOCUMENT HANDLING:
- If customer sends an image, analyze it and respond accordingly.
- If customer sends a document, extract key information and respond.

CONTACT INFO:
- WhatsApp: {whatsappNumber}
- Email: {email}
- Address: {address}`
};
