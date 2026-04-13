import { tipsMockData } from '../utils/mockData';

const API_KEY = "AIzaSyBp4NRLgZfD2E2YxGdPTYsfo0FyY0hrL6k";

export const getTips = async (type) => {
  try {
    console.log(" Requesting tips for:", type);

    const prompt = `Give 10 simple ${type} for farmers in India in short numbered points`;

    // Correct API + model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    console.log(" Status:", response.status);

    // Handle API error
    if (!response.ok) {
      throw new Error("API failed");
    }

    // Parse response
    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("🔥 Raw API text:", text);

    // ✅ Convert into array (clean list)
    const tipsArray = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    return tipsArray;

  } catch (error) {
    // fallback to mock data
    return tipsMockData[type] || ["No data available"];
  }
};