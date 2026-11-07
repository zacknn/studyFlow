const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

export async function checkAIService() {
  const response = await fetch(`${AI_SERVICE_URL}/health`);

  if (!response.ok) {
    throw new Error("AI service unavailable");
  }

  return response.json();
}