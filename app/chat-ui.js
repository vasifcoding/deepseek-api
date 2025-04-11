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
  useMediaQuery
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./globals.css";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import IsimSor from './dialog.js'
export default function Home() {
  const [userName, setUserName] = useState("");

useEffect(() => {
  const name = localStorage.getItem("userName");
  if (name) {
    setUserName(name);
  }
}, []);
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

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    const updatedMessages = [
      ...messages,
      { role: "user", content: prompt },
    ];

    try {
      const res = await axios.post("/api/geminiapi", { prompt ,userName});
      const reply = res.data?.content;

      if (reply) {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: reply },
        ]);
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

  useEffect(() => {
    hljs.highlightAll();
  }, [messages]);

  return (
    <Container   maxWidth="md" sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      py: 4, // dikeyde biraz nefes alma alanı, istersen 0 da yapabilirsin
    }}>
<IsimSor/>
      <Typography
        variant={isMobile ? "h6" : "h4"}
        className="text-white text-center mb-6"
        gutterBottom
      >
        İyi günler {userName && `${userName}`}  👋<br />
        Bugün sana nasıl yardımcı olabilirim?
      </Typography>

      {/* Chat geçmişi */}
      {messages.length > 1 && (
        <div
          className=" rounded-xl p-3 overflow-y-auto mb-6"
          style={{
            maxHeight: isMobile ? "50vh" : "60vh",
          }}
        >
          {messages
            .filter((msg) => msg.role !== "system")
            .map((msg, index) => (
              <div
                key={index}
                className={`mb-2 rounded-3xl max-w-full w-fit wrap-break-word whitespace-pre-wrap  ${
                  msg.role === "user"
                    ? "ml-auto bg-mediumGray  text-white"
                    : " bg-mediumGray text-white mr-auto"
                }`}
                sx={{
                  maxWidth: "100%",
                  width: "fit-content",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                <CardContent>
                  <Typography variant="body2" component="div">
                    {msg.role === "assistant" ? (
                      
                        <code className="language-html bg-mediumGray">{msg.content}</code>
                      
                    ) : (
                      msg.content
                    )}
                  </Typography>
                </CardContent>
              </div>
            ))}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Prompt alanı */}
      <div className="bg-mediumGray p-3 rounded-3xl shadow-md flex gap-2 items-end flex-col sm:flex-row">
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
            width: 40,
            height: 40,
            minWidth: 0,
            padding: 0,
            mt: isMobile ? 1 : 0,
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
    </Container>
  );
}
