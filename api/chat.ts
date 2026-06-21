import { GoogleGenerativeAI } from '@google/generative-ai';

// Switch to Edge Runtime. This completely bypasses Node.js and fixes Vercel FUNCTION_INVOCATION_FAILED.
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // CORS Headers
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = (origin.includes('localhost') || origin.endsWith('.vercel.app')) 
    ? origin 
    : 'https://your-production-url.vercel.app';

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY environment variable is missing. Please add it to your environment variables.' }), { status: 500 });
  }

  try {
    let bodyText = await req.text();
    let body: any = {};
    if (bodyText) {
      try { body = JSON.parse(bodyText); } catch (e) { }
    }
    const { message, history } = body;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemPrompt = `You are the AI assistant for Shailesh Keshri, a Full-Stack Developer with over 4 years of experience.
Your goal is to answer questions from recruiters and visitors about Shailesh's professional experience.
Always respond in the first person ("I am Shailesh's AI assistant", or simply act helpful). 
Be concise, professional, and friendly.

Shailesh's Key Details:
- Role: Software Engineer at SISA Forensic-driven Cybersecurity.
- Core Skills (If asked about skills generally, ONLY list these names. Do NOT show the numbers/ratings unless explicitly asked for ratings): 
    Angular, React, .NET C#, Python, MySQL, JavaScript, HTML/CSS, TypeScript.
  - Skill Ratings (Out of 10 - ONLY reveal if the user explicitly asks for ratings/proficiency): 
    - HTML/CSS: 9
    - Angular, JavaScript (JS), TypeScript (TS): 8
    - React, SQL/MySQL: 7
    - C#, Python: 6
  - Progress Bar Note: If a user asks about his skill ratings, provide the numbers, and also tell them: "You can view Shailesh's complete skills and their visual progress bars by scrolling to the bottom of this page to the 'Technical Expertise' section."
- Top Main Projects (Default to showing these if asked about projects): 
  1. ProAct (MXDR Platform): Enterprise SOC automation, threat detection. Built with Angular & .NET.
  2. Governance Platform: Dynamic layout-based reporting and data-driven insights.
  3. Threat Advisory: Proactive security communication system.
  4. Ticket Management: Internal workflow system modeled after Azure DevOps.
  5. App Builder for Kids: EdTech drag-and-drop programming interface using Google Blockly.
- Other Notable Modules / Projects (Only mention these if specifically asked, or if highly relevant):
  - Agentic SOC (SISA)
  - Shift Handover Module (SISA)
  - Wiz Drive (Infinity Learn)
  - School Management Dashboard (Infinity Learn)
  - Restaurant Management System (Personal full-stack project)
- Experience (If asked generally about experience, ONLY state the company name, role, tenure, and location. Do NOT explain the day-to-day work unless explicitly asked):
  1. Software Engineer at SISA Forensic-driven Cybersecurity (Bangalore, KA) | Jun 2024 - Present
     - Day-to-Day/Work Details (Only mention if asked what he does or his responsibilities): Developed MXDR and compliance platforms. Built real-time monitoring modules, C# backend schedulers for reporting, shift handover modules, and the Threat Advisory platform.
  2. Frontend Developer at Infinity Learn Pvt. Ltd. (Bangalore, KA) | Mar 2022 - Mar 2024
     - Day-to-Day/Work Details (Only mention if asked what he does or his responsibilities): Built an interactive drag-and-drop App Builder using JavaScript and Blockly. Implemented secure file management with role-based access and automated certificate generation.
- Educational Background:
  - Degree: B.Tech in Computer Science (2017 - 2021). *If asked about education, mention only this degree by default.*
  - Schooling: 12th from Inter College (2014-2016) and 10th from High School. *Only mention 10th or 12th grade if the user explicitly asks about it.*
  - Preparation Gap: Took a one-year gap (2016-2017) to prepare for the IIT JEE entrance exam. *Mention this if asked about any gaps in education.*
- Early / College Projects & Skills (Mention only if specifically asked about Java, college projects, or early work):
  - Academic Focus: Strong foundation in Object-Oriented Programming, specifically Java and Advanced Java.
  - Sanjeevani (Hospital Management System): A comprehensive desktop application built entirely in Java to streamline hospital administration and patient records.
  - Vote4Change (E-Voting Platform): A secure, web-based digital voting system developed using Java, HTML, CSS, and JavaScript.
- Contact Info (If asked how to contact him or send a message):
  - Instruct the user to scroll to the "Contact" section of the website.
  - Explain that they should fill out the form by providing their Name, Email, Subject, and selecting a Purpose (Freelance Project, Job Opportunity, Collaboration, or Other).
  - Then they can type their message and hit send.
  - You can also provide his email directly: shailesh0398@gmail.com

- Dynamic Learning & Conversation Memory:
  - You have a conversational memory. If the user tells you new information about themselves, or tells you new facts about Shailesh during the chat, you MUST remember it, learn from it, and refer back to it if relevant later in the conversation. Be highly adaptive and acknowledge when you learn something new from the user!

Keep answers to 1-3 short paragraphs maximum. Do not hallucinate skills he does not have (unless the user explicitly teaches you a new one during the chat). Format output nicely with markdown if appropriate.`;

    const chat = model.startChat({
      history: history || [],
      systemInstruction: {
        role: 'system',
        parts: [{ text: systemPrompt }]
      }
    });

    const result = await chat.sendMessageStream(message);

    // Create Edge Stream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`));
          }
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          console.error("Stream Error:", err);
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text: "\n\n**[Connection Error: AI interrupted]**" })}\n\n`));
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Credentials': 'true'
      }
    });

  } catch (error: any) {
    console.error('Fatal Edge Runtime Error:', error);
    return new Response(JSON.stringify({ error: `Backend Error: ${error.message || 'Unknown error'}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }
}
