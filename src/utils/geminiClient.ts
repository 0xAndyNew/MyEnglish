const GEMINI_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.8-flash-lite',
  'gemini-flash-latest',
  'gemini-2.5-flash',
];

export type GeminiPart =
  | { text: string }
  | { inline_data: { mime_type: string; data: string } };

interface GeminiRequestBody {
  contents: { parts: GeminiPart[] }[];
}

async function postGeminiEndpoint(
  url: string,
  headers: Record<string, string>,
  body: GeminiRequestBody
): Promise<{ ok: boolean; status: number; text: string; errorMessage: string }> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  const replyText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const errorMessage: string =
    data?.error?.message || `HTTP ${res.status} (${res.statusText || 'Error'})`;

  return {
    ok: res.ok && Boolean(replyText),
    status: res.status,
    text: replyText,
    errorMessage,
  };
}

export async function callGeminiContentsWithMeta(
  apiKeyRaw: string,
  parts: GeminiPart[]
): Promise<{ text: string; model: string }> {
  const key = apiKeyRaw.trim();
  if (!key) {
    throw new Error('Chưa có Gemini API Key.');
  }

  const body: GeminiRequestBody = { contents: [{ parts }] };
  const errors: string[] = [];

  // 1. Google AI Studio endpoint with x-goog-api-key header (fallback on 400/404/429/500/503)
  for (const model of GEMINI_MODELS) {
    const aiStudioUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const res = await postGeminiEndpoint(aiStudioUrl, { 'x-goog-api-key': key }, body);
    if (res.ok) {
      return { text: res.text, model };
    }
    errors.push(`${model}: ${res.errorMessage}`);
    if (![400, 404, 429, 500, 503].includes(res.status)) {
      break;
    }
  }

  // 2. Fallback to Vertex AI Express Mode endpoint if needed
  const vertexUrl = `https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`;
  const secondary = await postGeminiEndpoint(vertexUrl, {}, body);
  if (secondary.ok) {
    return { text: secondary.text, model: 'vertex-ai-gemini-2.5-flash' };
  }

  throw new Error(errors.join(' | ') || secondary.errorMessage);
}

export async function callGeminiContents(
  apiKeyRaw: string,
  parts: GeminiPart[]
): Promise<string> {
  const res = await callGeminiContentsWithMeta(apiKeyRaw, parts);
  return res.text;
}

export async function callGeminiTextWithMeta(
  apiKey: string,
  prompt: string
): Promise<{ text: string; model: string }> {
  return callGeminiContentsWithMeta(apiKey, [{ text: prompt }]);
}

export async function callGeminiText(apiKey: string, prompt: string): Promise<string> {
  return callGeminiContents(apiKey, [{ text: prompt }]);
}

export async function transcribeAudioWithGemini(
  apiKey: string,
  base64Audio: string,
  mimeType: string
): Promise<string> {
  const cleanMime = mimeType.split(';')[0] || 'audio/webm';
  const reply = await callGeminiContents(apiKey, [
    {
      text: 'Listen to this short English speech recording and transcribe ONLY the exact English words spoken. Return plain text with no quotes or extra explanation. If nothing was spoken, return an empty string.',
    },
    {
      inline_data: {
        mime_type: cleanMime,
        data: base64Audio,
      },
    },
  ]);
  return reply.trim().replace(/^["']|["']$/g, '');
}
