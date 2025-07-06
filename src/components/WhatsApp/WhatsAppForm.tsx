import React, { useState } from 'react';

const WhatsAppForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8888/api/whatsapp/send', { // URL del backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message,
      }),
    });

    if (response.ok) {
      alert('Mensaje enviado correctamente');
      setPhoneNumber('');
      setMessage('');
    } else {
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <div className="whatsapp-form">
      <h2>Contactar a través de WhatsApp</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Número de teléfono (incluye código de país):</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Ej: +5219982327523"
            required
          />
        </div>
        <div>
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            required
          />
        </div>
        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  );
};

export default WhatsAppForm;
