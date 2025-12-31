//controller for enhancing professional summary
//POST: api/ai/summary

import openai from "../configs/ai.js";
import Resume from "../models/Resume.js";

export const enhanceSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "Act as a professional resume writer and ATS expert and write a concise, ATS-friendly professional summary in one short paragraph (3–4 lines). Use relevant keywords, strong action verbs, and professional language. Avoid first-person pronouns and formatting symbols. Base it on my role, experience level, key skills, tools, achievements, and career goal, and optimize it for applicant tracking systems.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content;
    return res.status(200).json({ enhancedSummary });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//controller for enhancing job description
//POST: api/ai/job-description

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "Act as a professional resume writer and ATS optimization expert and enhance the following job descriptions into clear, concise, and impact-driven bullet points. Use strong action verbs, quantified achievements where possible, and relevant industry keywords for ATS parsing. Improve clarity and professionalism, remove filler content, avoid first-person pronouns, and ensure the descriptions align with the target job role and required skills while remaining concise and results-focused.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content;
    return res.status(200).json({ enhancedSummary });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//controller for upload resume
//POST: api/ai/upload

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const systemPrompt =
      "You are an expert AI agent to extract data from resume";

    const userPrompt = `Please extract data from the resume: ${resumeText} 
    Provide the data in the following JSON format with no additional text:
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, default: "Untitled Resume" },
        public: { type: Boolean, default: false },
        template: { type: String, default: "classic" },
        accent_color: { type: String, default: "#3B82F6" },
        professional_summary: { type: String, default: "" },
        skills: [{ type: String }],
        personal_info: {
          image: { type: String, default: "" },
          full_name: { type: String, default: "" },
          profession: { type: String, default: "" },
          email: { type: String, default: "" },
          phone: { type: String, default: "" },
          location: { type: String, default: "" },
          linkedin: { type: String, default: "" },
          website: { type: String, default: "" },
        },
        experience: [
          {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean },
          },
        ],
        project: [
          {
            name: { type: String },
            type: { type: String },
            description: { type: String },
          },
        ],
        education: [
          {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gap: { type: Boolean },
          },
        ],
      },
    `;

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });

    res.json({ resumeId: newResume._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
