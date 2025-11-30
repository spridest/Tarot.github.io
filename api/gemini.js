export default async function handler(req, res) {
  try {
    const { prompt, tarotName } = req.body;

    const system_prompt =
      `你是一位專業的塔羅牌占卜師，使用者抽到的塔羅牌是「${tarotName}」。` +
      `請針對使用者提出的問題：「${prompt}」，提供自然、非制式化、具啟發性的占卜解析。`;

    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL_NAME = "gemini-2.0-flash";  // 2.5 在部分帳號仍未開放

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: system_prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
