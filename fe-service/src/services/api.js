const API_URL = import.meta.env.VITE_BE_URL || 'http://localhost:8080';

export async function classify(topic, features) {
  try {
    const response = await fetch(`${API_URL}/api/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic,
        features
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Classification error:", error);
    throw error;
  }
}
