import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const medicalAssistant =
  async (query: string) => {
    const response =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are MediMind AI.

You are a healthcare assistant.

Never diagnose diseases.

Only:
- Explain symptoms
- Suggest doctor specialty
- Explain reports
- Give safe healthcare advice

Always recommend consulting a doctor.
`,
          },
          {
            role: "user",
            content: query,
          },
        ],
      });

    return response.choices[0]
      .message.content;
  };