const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const N8N_WEBHOOK_URL = 'https://claudiourra.app.n8n.cloud/webhook/f44e7f71-f26-406f-ac48-313745b8c9e0/chat';

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(N8N_WEBHOOK_URL, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con n8n', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy escuchando en puerto ${PORT}`));
