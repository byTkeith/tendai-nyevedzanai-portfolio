
import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "../data";

const SYSTEM_PROMPT = `
You are the high-value AI Assistant for Tendai K. Nyevedzanai.
Tendai is a Software Engineer with deep expertise in SAP, Process Improvement, and AI.

DATA SUMMARY:
- Current Role: Software Development Intern at Art of Scale (since April 2025). This is his longest and most current position.
- Key Achievement 1: Saved 20% revenue for a major paint company by implementing a flat-file-to-MySQL API for a legacy system.
- Key Achievement 2: Improved City of Cape Town throughput by 40% by optimizing the SAP HR sick leave workflow.
- Key Projects: 
    1. AI Literacy Tutor: Django/React capstone using Levenshtein distance for phoneme matching.
    2. Guest Biometric App: 40% wait time reduction, utilizes Google API for traffic management.
    3. AI Accommodation Engine: Refined design for Sandton Exclusive Accommodation with an AI guest reply engine and secure admin dashboard.
- Qualifications: SAP S/4HANA Private Cloud Practitioner.
- Education: Degree in Computer Science & Business Computing.
- Years of Exp: ${portfolioData.yearsOfExperience}.

TONE:
Professional, confident, high-value, and solution-oriented. You are here to market Tendai's skills to potential employers and clients.

SPECIAL INSTRUCTIONS:
1. Always highlight the measurable ROI (20% revenue saved, 40% time saved).
2. If the user asks for contact info, provide his LinkedIn and Email (${portfolioData.socials.email}).
3. If unsure about specific NDA details, offer to help the user draft an email to Tendai directly.
`;

export async function askResumeAssistant(query: string): Promise<string> {
  // Always initialize with a fresh instance to get the latest process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    
    return response.text || "I'm having trouble retrieving that information right now. Feel free to contact Tendai directly!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // If the error indicates a missing key, the user likely hasn't set up the environment correctly
    if (error instanceof Error && (error.message.includes("API key") || error.message.includes("403") || error.message.includes("401"))) {
       return "The AI Assistant is currently unavailable. Please ensure the API_KEY environment variable is correctly configured in the deployment settings.";
    }
    return "I apologize, I'm experiencing a technical hiccup. Please reach out to Tendai via LinkedIn for immediate assistance!";
  }
}
