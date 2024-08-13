const fetch = require('node-fetch'); // Install with `npm install node-fetch`

const sendWhatsAppMessage = async (req, reply) => {
    const { message, to } = req.body;
    
    if (!message || !to) {
        return reply.code(400).send({ error: 'Message and recipient phone number are required' });
    }

    const url = `https://graph.facebook.com/v20.0/241360959050305/messages`;
    const accessToken = '**********************';

    const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
            name: 'hello_world',
            language: {
                code: 'en_US'
            },
            components: [{
                type: 'body',
                parameters: [{
                    type: 'text',
                    text: message
                }]
            }]
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const responseBody = await response.json();

        if (!response.ok) {
            return reply.code(response.status).send({ error: 'Failed to send message', details: responseBody });
        }

        reply.send({ success: true, message: 'Message sent', response: responseBody });
    } catch (error) {
        reply.code(500).send({ error: 'Failed to send message', details: error.message });
    }
};

module.exports = { sendWhatsAppMessage };
