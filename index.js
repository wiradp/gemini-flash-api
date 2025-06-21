const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { MIMEType } = require("util");

dotenv.config();
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

const upload = multer({ dest: "uploads/" });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Gemini API server running at http://localhost:${PORT}`);
});

// Route untuk generate teks
app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// const imageToGenerativePart = (imagePath) => {
//   inlineData: {
//     Data: fs.readFileSync(imagePath).toString("base64"),
//     MIMEType: 'MIMEType.PNG',
//   },
//   };

const imageToGenerativePart = (imagePath) => {
  return {
    inlineData: {
      data: fs.readFileSync(imagePath).toString("base64"),
      mimeType: "image/png", // You might want to infer this dynamically
    },
  };
};

// Route untuk generate image
app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  const prompt = req.body.prompt || "Describe the image";
  const image = imageToGenerativePart(req.file.path);

  try {
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

// Route untuk generate dokumen
app.post(
  "/generate-from-document",
  upload.single("document"),
  async (req, res) => {
    const filepath = req.file.path;
    const buffer = fs.readFileSync(filepath);
    const base64Data = buffer.toString("base64");
    const mimeType = req.file.mimetype;

    try {
      const documentPart = { inlineData: { data: base64Data, mimeType } };

      const result = await model.generateContent([
        "Analisa dokumen ini:",
        documentPart,
      ]);
      const response = await result.response;
      res.json({ output: response.text() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      fs.unlinkSync(filepath);
    }
  }
);

// Route untuk Generate Audio
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  const filepath = req.file.path;
  const audioBuffer = fs.readFileSync(filepath);
  const base64Data = audioBuffer.toString("base64");
  const mimeType = req.file.mimetype;

  try {
    const audioPart = { inlineData: { data: base64Data, mimeType } };

    const result = await model.generateContent([
      "Transkripsikan audio ini:",
      audioPart,
    ]);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(filepath);
  }
});
