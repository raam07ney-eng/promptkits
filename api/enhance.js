
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, target, style, imageBase64, imageMediaType } = req.body || {};

  if (!prompt && !imageBase64) {
    return res.status(400).json({ error: 'Prompt or image is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const systemPrompt = `You are an expert prompt engineer. Your job is to take a basic prompt and enhance it into a detailed, optimized version specifically for ${target || 'ChatGPT'}. Make it ${style || 'detailed and structured'}. Return ONLY the enhanced prompt — no explanations, no preamble, no quotes. Just the ready-to-use improved prompt.`;

  try {
    let messages;

    if (imageBase64) {
      // Image analysis mode
      messages = [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: imageMediaType || 'image/jpeg',
              data: imageBase64
            }
          },
          {
            type: 'text',
            text: `Analyze this image and generate a ${style || 'detailed'} AI image prompt optimized for ${target || 'Midjourney'}. Describe the subject, style, lighting, colors, mood, composition, and any technical details. Return ONLY the prompt text, ready to paste into ${target || 'Midjourney'}. No explanations, no preamble.`
          }
        ]
      }];
    } else {
      // Text prompt enhancement mode
      messages = [{ role: 'user', content: 'Enhance this prompt: ' + prompt }];
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: imageBase64 ? undefined : systemPrompt,
        messages
      })
    });

    const responseText = await response.text();
    let data;
    try { data = JSON.parse(responseText); }
    catch(e) { return res.status(500).json({ error: 'Invalid response: ' + responseText.slice(0,200) }); }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const text = data.content?.map(i => i.text || '').join('') || '';
    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
