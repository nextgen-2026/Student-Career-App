import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, AIResponseData } from "../types";

// Helper to safely get the key from environment variables
const getApiKey = (): string | null => {
  // 1. Check Vite/Vercel Environment Variables (Preferred for Production)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY;
  }

  // 2. Check Standard Env
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  
  return null;
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    motivationalQuote: {
      type: Type.STRING,
      description: "A highly motivating quote personalized to the user's goal.",
    },
    careerSummary: {
      type: Type.STRING,
      description: "A brief summary of the career path analysis.",
    },
    roadmap: {
      type: Type.ARRAY,
      description: "A step-by-step career roadmap.",
      items: {
        type: Type.OBJECT,
        properties: {
          stepName: { type: Type.STRING },
          description: { type: Type.STRING, description: "Detailed instruction for this step." },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                url: { type: Type.STRING, description: "A valid URL to a course, exam portal (like JEE/NEET/GATE), or learning resource." },
              },
            },
          },
        },
        required: ["stepName", "description", "resources"],
      },
    },
    weeklySchedule: {
      type: Type.ARRAY,
      description: "A 7-day optimized schedule.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          focus: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["day", "focus", "activities"],
      },
    },
  },
  required: ["motivationalQuote", "careerSummary", "roadmap", "weeklySchedule"],
};

export const generateCareerPlan = async (user: UserProfile): Promise<AIResponseData> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    console.error("API Key not found in environment variables.");
    throw new Error("API configuration error.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as an expert career counselor and life coach for students in India.
    
    User Profile:
    - Name: ${user.name}
    - Current Status: ${user.type} (${user.gradeOrYear})
    - Skills/Interests: ${user.interests}
    - Ultimate Goal: ${user.goal}

    Task:
    1. Analyze the student's profile.
    2. Create a detailed, step-by-step roadmap to achieve their goal.
    3. IMPORTANT: Provide SPECIFIC resources relevant to INDIA. Include links to official exam sites (JEE/NEET/UPSC), top courses (Coursera/Udemy/NPTEL), or standard books.
    4. Create a realistic weekly study/practice schedule.
    5. Provide a personalized motivational quote.

    The output must be strictly valid JSON matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a helpful, encouraging, and highly knowledgeable career guide for Indian students. Ensure all links are real and relevant."
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from AI.");
    }

    return JSON.parse(text) as AIResponseData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};