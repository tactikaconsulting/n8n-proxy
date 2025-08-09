import axios from 'axios';

export default async function handler(req, res) {
    const allowedOrigins = [
      'https://www.tactikaconsulting.com',
      'http://www.tactikaconsulting.com'
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log('BODY RECIBIDO:', req.body);

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const response = await axios.post(
            'https://claudiourra.app.n8n.cloud/webhook/f44e7f71-f26-406f-ac48-313745b8c9e0/chat',
            req.body,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('RESPUESTA N8N:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            console.log('ERROR N8N:', error.response.status, error.response.data);
            res.status(500).json({
                error: 'Error al conectar con n8n',
                details: error.message,
                n8nStatus: error.response.status,
                n8nData: error.response.data
            });
        } else {
            console.log('ERROR N8N:', error.message);
            res.status(500).json({ error: 'Error al conectar con n8n', details: error.message });
        }
    }
}
