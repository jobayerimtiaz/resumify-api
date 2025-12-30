//controller for enhancing professional summary
//POST: api/ai/summary

import openai from "../configs/ai.js";

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
