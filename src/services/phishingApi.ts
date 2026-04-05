const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export interface PredictionResponse {
  is_phishing: boolean;
  confidence: number;
  risk_level: string;
}

export async function checkEmail(email: string): Promise<PredictionResponse> {
  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Prediction failed');
  }

  return response.json();
}
