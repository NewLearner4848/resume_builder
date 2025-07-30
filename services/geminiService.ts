import { GoogleGenAI, Type } from "@google/genai";
import type { ResumeData } from '../types';

const API_KEY = "AIzaSyBzEdolaY1CwQ3kMp5fPjPrI7MZ0fam0i4";

export const enhanceTextSection = async (originalText: string, userGuidance: string, sectionType: string): Promise<string> => {
    const prompt = `
    You are a world-class professional resume writer. Your task is to rewrite and enhance a specific section of a resume based on user guidance.
    Adopt a professional tone, use strong action verbs, and quantify achievements where possible.
    Focus on making the text impactful and ATS-friendly.

    - Section Type: "${sectionType}"
    - Original Text: "${originalText}"
    - User Guidance: "${userGuidance || 'No specific guidance provided. General improvements.'}"

    Rewrite the text based on these details. The output must be a JSON object with a single key "enhancedText".
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            enhancedText: {
                type: Type.STRING,
                description: `The enhanced text for the ${sectionType} section.`
            }
        },
        required: ['enhancedText']
    };

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        if (typeof parsedData.enhancedText === 'string') {
            return parsedData.enhancedText;
        } else {
            throw new Error("Invalid response format from API.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error && (error.message.includes('API_KEY') || error.message.toLowerCase().includes('api key'))) {
             throw new Error("API Key not configured. Please ensure the API_KEY environment variable is set.");
        }
        throw new Error("Failed to generate suggestion from Gemini API.");
    }
};


export const generateCoverLetter = async (data: ResumeData, jobDescription: string): Promise<string> => {
    const prompt = `
You are a professional career coach. Your task is to write a compelling and professional cover letter.

Use the provided resume information to highlight the candidate's most relevant skills and experiences.
Tailor the letter specifically to the provided job description, matching the candidate's qualifications to the job's requirements.
The tone should be confident but not arrogant. Structure the letter with a clear introduction, body, and conclusion.

The output should be plain text, with professional formatting (e.g., paragraphs, closing), ready to be copied and pasted.

**Candidate's Resume Information:**
- Name: ${data.fullName}
- Most Recent Job: ${data.workExperience[0]?.jobTitle || 'No recent job listed'} at ${data.workExperience[0]?.company || ''}
- Key Skills: ${data.skills.join(', ')}
- Professional Summary: ${data.professionalSummary}
- Experience Highlights: ${data.workExperience.map(exp => `- ${exp.jobTitle} at ${exp.company}:\n${exp.description}`).join('\n\n')}

**Job Description to Target:**
"${jobDescription}"
`;

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for cover letter:", error);
        if (error instanceof Error && (error.message.includes('API_KEY') || error.message.toLowerCase().includes('api key'))) {
             throw new Error("API Key not configured. Please ensure the API_KEY environment variable is set.");
        }
        throw new Error("Failed to generate cover letter from Gemini API.");
    }
}