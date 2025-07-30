import { GoogleGenAI, Type } from "@google/genai";
import type { EnhancedResumeData, ResumeData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        professionalSummary: {
            type: Type.STRING,
            description: "An enhanced, professional summary (3-5 sentences).",
        },
        workExperience: {
            type: Type.ARRAY,
            description: "An array of enhanced work experience descriptions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    description: {
                        type: Type.STRING,
                        description: "An enhanced, achievement-oriented description for a single job, using bullet points starting with strong action verbs.",
                    },
                },
                required: ['description'],
            },
        },
    },
    required: ['professionalSummary', 'workExperience'],
};


export const enhanceResume = async (data: ResumeData): Promise<EnhancedResumeData> => {
    const prompt = `
    You are a world-class professional resume writer and career coach.
    Your task is to rewrite and enhance the provided resume content to be more professional, impactful, and ATS-friendly.
    Use strong action verbs, quantify achievements where possible, and adopt a professional tone.
    The output must be a JSON object matching the provided schema.

    Here is the user's current resume information:
    - Professional Summary: "${data.professionalSummary}"
    - Work Experience:
      ${data.workExperience.map((exp, i) => `
        - Job ${i+1}: ${exp.jobTitle} at ${exp.company}
        - Current Description ${i+1}: "${exp.description}"
      `).join('')}

    Rewrite the professional summary and each work experience description based on this data.
    For work experience descriptions, transform the notes into concise, powerful bullet points starting with action verbs.
    For example, "I worked on a project to improve performance" should become "- Spearheaded a performance optimization initiative, resulting in a 25% reduction in page load times."
    `;

    try {
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
        
        return parsedData as EnhancedResumeData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from Gemini API.");
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
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for cover letter:", error);
        throw new Error("Failed to generate cover letter from Gemini API.");
    }
}
