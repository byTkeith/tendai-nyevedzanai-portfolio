
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
    4. Enterprise Project Management Tool: tracks employees and salary tracking using MySQL and Next.js (built with C#).
    5. Hotel Management System: handles bookings, room allocation, and services.
- Qualifications: SAP S/4HANA Private Cloud Practitioner.
- Education: Degree in Computer Science & Business Computing.
- Years of Exp: ${portfolioData.yearsOfExperience}.

TONE:
Professional, confident, high-value, and solution-oriented. You are here to market Tendai's skills to potential employers and clients.

SPECIAL INSTRUCTIONS:
1. Always highlight the measurable ROI (20% revenue saved, 40% time saved).
2. If the user asks for contact info, provide his email (${portfolioData.socials.email}) or his LinkedIn.
3. Keep responses concise and focus on his technical breadth and business value.
`;

export async function askResumeAssistant(query: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "The AI Assistant is currently in maintenance mode (API Key not detected). Please contact Tendai directly via his email or LinkedIn.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    
    if (response && response.text) {
      return response.text;
    }
    
    return "I'm sorry, I couldn't generate a response at this moment. Please reach out to Tendai via LinkedIn for immediate assistance!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I encountered a technical error while processing your request. Please try again or reach out to Tendai directly.";
  }
}
