import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Groq from "groq-sdk";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

const apiKey = process.env.API_KEY;

const groq = new Groq({ apiKey: apiKey })

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/summarize", async (req, res) => {
  try {
    const { transcript, prompt } = req.body;

    const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: transcript + "\n\n" + prompt,
      },
    ],
    model: "openai/gpt-oss-20b",
  });

    const summary = response.choices[0]?.message?.content || ""
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating summary" });
  }
});

app.post("/send_email", async (req, res) => {
  try {
    const { summary, recipients } = req.body;

    console.log(recipients)

    const data = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: recipients, 
      subject: "Meeting Summary",
      html: `<p>${summary}</p>`,
    });
    
    await res.json({ message: "Email sent successfully!", data });
  } catch (error) {
    console.error(error);
    await res.status(500).json({ error: "Error sending email" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));