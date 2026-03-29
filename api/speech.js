export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { audioBase64 } = req.body;
  if (!audioBase64) return res.status(400).json({ error: 'audioBase64 is required' });
  const GCP_API_KEY = process.env.GCP_API_KEY;
  if (!GCP_API_KEY) return res.status(500).json({ error: 'GCP_API_KEY not configured' });
  try {
    const gcpRes = await fetch(
      "https://speech.googleapis.com/v1/speech:recognize?key=" + GCP_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'es-US',
            alternativeLanguageCodes: ['es-MX', 'es-ES'],
            enableAutomaticPunctuation: true,
            model: 'latest_long',
            useEnhanced: true,
            speechContexts: [{
              phrases: ['yo quiero','me gusta','tengo','voy a','porque','helado','pizza','perro','gato','parque','jugar','hace sol','es dulce','yo veo','tengo hambre','queso'],
              boost: 20
            }]
          },
          audio: { content: audioBase64 }
        })
      }
    );
    const data = await gcpRes.json();
    if (!gcpRes.ok) return res.status(gcpRes.status).json({ error: data.error && data.error.message || 'GCP error' });
    const transcript = data.results && data.results[0] && data.results[0].alternatives && data.results[0].alternatives[0] && data.results[0].alternatives[0].transcript || '';
    const confidence = data.results && data.results[0] && data.results[0].alternatives && data.results[0].alternatives[0] && data.results[0].alternatives[0].confidence || 0;
    return res.status(200).json({ transcript: transcript, confidence: confidence });
  } catch (err) {
    console.error('Speech proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}