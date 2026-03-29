export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages, systemPrompt } = req.body;
  if (!messages || !systemPrompt) return res.status(400).json({ error: 'messages and systemPrompt are required' });
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 300,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ]
      })
    });
    const data = await openaiRes.json();
    if (!openaiRes.ok) return res.status(openaiRes.status).json({ error: data.error && data.error.message || 'OpenAI error' });
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    return res.status(200).json({ reply: reply || 'Muy bien! Keep trying!' });
  } catch (err) {
    console.error('Chat proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
