import { getAuthToken } from './storage';

export type GeminiPart =
  | { text: string }
  | { inline_data: { mime_type: string; data: string } };

export async function callGeminiContentsWithMeta(
  _apiKeyOrFlag: string,
  parts: GeminiPart[]
): Promise<{ text: string; model: string }> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers,
      body: JSON.stringify({ parts }),
    });
  } catch {
    throw new Error('Không kết nối được Backend Server (cổng 3001).');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Lỗi kết nối AI (${res.status})`);
  }
  return {
    text: String(data?.text || ''),
    model: String(data?.model || 'gemini'),
  };
}

export async function callGeminiContents(
  apiKeyOrFlag: string,
  parts: GeminiPart[]
): Promise<string> {
  const res = await callGeminiContentsWithMeta(apiKeyOrFlag, parts);
  return res.text;
}

export async function callGeminiTextWithMeta(
  apiKeyOrFlag: string,
  prompt: string
): Promise<{ text: string; model: string }> {
  return callGeminiContentsWithMeta(apiKeyOrFlag, [{ text: prompt }]);
}

export async function callGeminiText(apiKeyOrFlag: string, prompt: string): Promise<string> {
  return callGeminiContents(apiKeyOrFlag, [{ text: prompt }]);
}

export async function transcribeAudioWithGemini(
  apiKeyOrFlag: string,
  base64Audio: string,
  mimeType: string
): Promise<string> {
  const cleanMime = mimeType.split(';')[0] || 'audio/webm';
  const reply = await callGeminiContents(apiKeyOrFlag, [
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
