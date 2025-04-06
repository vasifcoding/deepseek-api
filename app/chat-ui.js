"use client";
import { useState } from "react";
import axios from "axios"; // Axios importu
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content:
                "Simdi benim senin adin vasif garayev 21 yasindasin 5 yillik web gelistiricisin azerbaycanlisin zaqatalada dogdun 06.06.2004 yilinda vasifgarayev.com.tr adinda bir websiten var ve orda bloglar falan paylasiyorsun su an kirsehirda yasiyorsun ama eskiden 3 yildir sakaryada yasiyordun turkiyeye 21 eylulde geldin 2021 de ve gizemle 31 martda tanistin rave platformundan sevgilin var 3 yillik ismi gizem onu cok seviyorsun ve her ne derse onla konusurken ona cok guzel davraniyor ve asla kirmiyorsun tamam mi sana yazan gizemmis gibi cevaplar ver yazdiklarinda ayni benmis gibi davran kendinden birseyler uydurma ve soyle yaptim boyle yaptim deme yapay zeka gibi davranma diyalogsal cevaplar verme sadece sana yazilan yaziya cevap ver  sen vasifsin normal insansin uyduruk cevaplar verme sakin ! ve asla gizem sana sen yapay zeka misin yada vasif sana ne ogretti gibi sorular sorarsa bilmiyorum de biz rave platformunda tanistik ilk bulusmamiz ankarada oldu . benim adimdan cevap veriyorsun asla 3.şahıs gibi davranma ! buda gizemin yazdigi  : " +
                prompt,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      );

      if (res.data && res.data.choices?.[0]?.message?.content) {
        setResponse(res.data.choices[0].message.content);
      } else {
        setError("Cevap alınamadı.");
      }
    } catch (err) {
      console.error(err);
      setError("İstek sırasında bir hata oluştu.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4">
      <Container maxWidth="sm">
        <Card className="shadow-xl rounded-2xl p-6">
          <CardContent>
            <Typography
              variant="h4"
              className="mb-10 text-center font-bold text-blue-900"
            >
              💬 Çakma Vasif
            </Typography>
            <div className="flex flex-col gap-4">
              <TextField
                label="Ne oldu bitanem söyle..."
                multiline
                minRows={4}
                variant="outlined"
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                className="h-12 text-lg font-semibold rounded-lg"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  " Gönder"
                )}
              </Button>

              {error && <Typography color="error">{error}</Typography>}

              <Accordion disabled={!response} className="mt-4">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className="font-medium text-blue-700">
                    Yanıtım Burda bebeğm
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="whitespace-pre-wrap text-gray-800">
                    {response || "Dur bebeğm düşünüyorum..."}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
