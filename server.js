const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory inside 'server'
app.use(express.static(path.join(__dirname, 'public')));

// OpenAI endpoint
app.post('/api/openai', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'OpenAI API error', details: err.message });
  }
});

// SendGrid endpoint
app.post('/api/sendgrid', async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        personalizations: [{ to: [{ email: to }], subject }],
        from: { email: 'noreply@yourdomain.com', name: 'Resume Builder' },
        content: [{ type: 'text/html', value: html }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'SendGrid API error', details: err.message });
  }
});

// RapidAPI Jobs endpoint
app.get('/api/jobs', async (req, res) => {
  try {
    const { query, location } = req.query;
    const response = await axios.get(
      `https://jobs-api14.p.rapidapi.com/list?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Jobs API error', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));