// /api/gemini.js

export default async function handler(req, res) {
  try {
    const { prompt, tarotName } = req.body;

    const system_prompt = `
        你是一個專業的塔羅牌占卜師，使用者抽到的塔羅牌是: ${tarotName}。
        請根據使用者的問題是: "${prompt}"，提供非制式化評語。
        `;

    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL_NAME = "gemini-2.5-flash";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: system_prompt }]
        }]
      })
    });

    const data = await upstream.json();
    
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
