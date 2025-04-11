import { GoogleGenAI } from "@google/genai";

// API key'i burada kullanıyoruz
const ai = new GoogleGenAI({ apiKey: "AIzaSyCqfSes7lD2MCPaSAQMQQrafcag8snqLdM" });

export async function POST(req) {
  try {
    // İstekten gelen body'den prompt'ı alıyoruz
    const { prompt } = await req.json();

    // Gemini modelini kullanarak içerik oluşturuyoruz
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Model adı
      contents:"kullanicinin adi vasif  prompt : "  +prompt, // Prompt
    });

    // Yanıtı döndürüyoruz
    return new Response(JSON.stringify({ content: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Hata:", err);
    return new Response(JSON.stringify({ error: "Bir hata oluştu." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
