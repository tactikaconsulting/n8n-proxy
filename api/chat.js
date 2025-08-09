import axios from 'axios';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.tactikaconsulting.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Log para ver el body recibido por el proxy
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
        // Log para ver la respuesta que entrega n8n al proxy
        console.log('RESPUESTA N8N:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con n8n', details: error.message });
    }
}
