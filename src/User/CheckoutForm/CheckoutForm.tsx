import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Importa el contexto de usuario
import { useLocation } from 'react-router-dom'; // Importa useLocation para recibir el total

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser(); // Obtén el usuario logueado desde el contexto
  const location = useLocation(); // Hook para acceder al estado pasado desde Cart.tsx
  const total = location.state?.total; // Obtén el total desde el estado

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!total) {
    console.error("No se recibió el total desde el carrito.");
    return <p>Error: No se pudo obtener el monto total.</p>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js no está listo.");
      setPaymentError("Stripe no está inicializado. Intenta nuevamente.");
      return;
    }

    if (!user || !user.id_usuario) {
      console.error("No se pudo obtener el ID del usuario.");
      setPaymentError("No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement no está inicializado.");
      setPaymentError("No se pudo inicializar el elemento de la tarjeta.");
      setIsProcessing(false);
      return;
    }

    // Crear el PaymentMethod
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error("Error al crear el PaymentMethod:", error);
      setPaymentError(error.message || 'Error desconocido');
      setIsProcessing(false);
      return;
    }

    console.log("PaymentMethod creado:", paymentMethod);

    try {
      // Llamada al backend para procesar el pago
      const response = await axios.post(
        'https://d3p-backend.onrender.com/api/stripe/crear-pago',
        {
          amount: total, // Convertir el total a centavos
          currency: 'mxn', // Moneda
          paymentMethodId: paymentMethod.id, // Enviar el ID del PaymentMethod
          userId: user.id_usuario, // Enviar el ID del usuario logueado
        }
      );

      if (response.data.success) {
        // Vaciar el carrito del usuario después del pago exitoso
        await axios.delete(`https://d3p-backend.onrender.com/api/carrito/vaciar/${user.id_usuario}`);

        alert('¡Pago exitoso!');
        // Redirigir al home después del pago exitoso
        window.location.href = 'http://localhost:5173/';
      } else {
        console.error("Error en la respuesta del backend:", response.data.message);
        setPaymentError(response.data.message);
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setPaymentError('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card-element" className="block text-lg font-medium">
          Información de la tarjeta
        </label>
        <CardElement id="card-element" />
      </div>

      {paymentError && <div className="text-red-500">{paymentError}</div>}

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg ${isProcessing ? 'opacity-50' : ''}`}
      >
        {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)} MXN`}
      </button>
    </form>
  );
};

export default CheckoutForm;