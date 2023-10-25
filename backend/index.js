const express = require('express');
const axios = require('axios');
const cors = require('cors'); // ImPORT the cors middleware
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Use the cors middleware to enable CORS

app.get("/",(req,res)=>{
  res.send("Welcome to the homepage of Shayari-Chatgpt Backend")  
});




const API_KEY = process.env.OPENAI_API_KEY;

app.post("/get", async (req, res) => {
  try {
    const { keyword } = req.body;
    const { type } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "keyword is missing" });
    }
    if (!type) {
      return res.status(400).json({ error: "type is missing" });
    }

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `create ${type} on ${keyword}`,
        },
      ],
      max_tokens: 100,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    const result = data.choices[0].message.content;

    res.json({ result });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});








