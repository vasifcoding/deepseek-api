import { GoogleGenAI } from "@google/genai";

// API key'i burada kullanıyoruz
const ai = new GoogleGenAI({ apiKey: "AIzaSyCqfSes7lD2MCPaSAQMQQrafcag8snqLdM" });

export async function POST(req) {
  try {
    const { prompt, userName } = await req.json(); // userName burada geliyor

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Kullanicinin adi ${userName} ve istegi : ${prompt}`,
    });

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
