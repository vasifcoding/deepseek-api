"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./globals.css";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Kullanicinin adi Vasif. Vasif'e yardimci ol.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    const updatedMessages = [
      ...messages,
      { role: "user", content: prompt },
    ];

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-r1:free",
          messages: updatedMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      );

      const reply = res.data.choices?.[0]?.message;
      if (reply?.content) {
        setMessages([...updatedMessages, reply]);
        setPrompt("");
      } else {
        setError("Yanıt alınamadı.");
      }
    } catch (err) {
      console.error(err);
      setError("İstek sırasında bir hata oluştu.");
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container maxWidth="lg">
      <div className="pt-20 pb-32">
        <Typography
          variant="h4"
          className="text-white text-center mb-8"
          gutterBottom
        >
          İyi günler Vasif 👋<br />
          Bugün sana nasıl yardımcı olabilirim?
        </Typography>

        {/* Chat geçmişi */}
        {messages.length > 1 ?     <div className="bg-mediumGray rounded-xl p-4 shadow-md max-h-[60vh] overflow-y-auto mb-6">
          {messages
            .filter((msg) => msg.role !== "system")
            .map((msg, index) => (
              <Card
                key={index}
                className={`mb-2 ${
                  msg.role === "user"
                    ? " ml-auto"
                    : "bg-lightGray mr-auto"
                }`}
                style={{ maxWidth: "min-content" ,overflow:"auto"}}
              >
                <CardContent>
                  <Typography variant="body2"><pre>{msg.content}</pre></Typography>
                </CardContent>
              </Card>
            ))}
          <div ref={chatEndRef} />
        </div>:null}
    

        {/* Prompt alanı */}
        <div className="bg-mediumGray p-4 justify-center rounded-3xl shadow-md flex gap-2 items-center">
          <TextField
            label="Bir şey sor..."
            multiline
            fullWidth
            maxRows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            variant="standard"
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            sx={{
              borderRadius: "50%",
              width: 50,
              height: 50,
              minWidth: 0,
              padding: 0,
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon fontSize="small" />
            )}
          </Button>
        </div>

        {error && (
          <Typography color="error" className="mt-4">
            {error}
          </Typography>
        )}
      </div>
    </Container>
  );
}
