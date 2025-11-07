import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// POST endpoint to send Telegram messages
app.post("/send", async (req, res) => {
  const { message } = req.body;
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!message) {
    return res.status(400).json({ success: false, error: "No message provided" });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });

    const data = await response.json();

    if (data.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: data.description });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(10000, () => console.log("Server running on port 10000"));
