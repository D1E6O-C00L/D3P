"use client";

import type React from "react";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  X,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

// Definición de la interfaz para los productos
interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  imagen_url: string;
}

// Estilos personalizados para CardElement
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

// Componente de Modal personalizado
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div
        className={`bg-white rounded-lg shadow-xl overflow-hidden w-full ${maxWidth} animate-scaleIn`}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

// Componente principal de CheckoutForm
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state?.total;
  const products: Product[] = location.state?.products || []; // Aquí definimos el tipo correcto de `products`

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Estados para los modales
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!total) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <AlertTriangle size={48} className="text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold text-[#0c2c4c] mb-2">
          Error en el proceso de pago
        </h2>
        <p className="text-gray-600 mb-6">
          No se pudo obtener el monto total de la compra.
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-[#0c2c4c] text-white rounded-md hover:bg-[#1a4b7f] transition-colors"
        >
          Volver al carrito
        </button>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowConfirmModal(true);
  };

  const processPayment = async () => {
    if (!stripe || !elements) {
      setErrorMessage("Stripe no está inicializado. Intenta nuevamente.");
      setShowErrorModal(true);
      return;
    }

    if (!user || !user.id_usuario) {
      setErrorMessage(
        "No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente."
      );
      setShowErrorModal(true);
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);
    setShowConfirmModal(false);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("No se pudo inicializar el elemento de la tarjeta.");
      setShowErrorModal(true);
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(
        error.message || "Error desconocido al procesar la tarjeta"
      );
      setShowErrorModal(true);
      setIsProcessing(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8888/api/stripe/crear-pago",
        {
          amount: total,
          currency: "mxn",
          paymentMethodId: paymentMethod.id,
          userId: user.id_usuario,
        }
      );

      if (response.data.success) {
        await axios.delete(
          `http://localhost:8888/api/carrito/vaciar/${user.id_usuario}`
        );
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.data.message || "Error al procesar el pago");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setErrorMessage("Error al comunicarse con el servidor de pagos");
      setShowErrorModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div className="min-h-screen bg-[#0c2c4c] py-12 px-4 items-center justify-center">
      <Link
        to="/"
        className="flex items-center text-white hover:text-gray-300 transition pb-5"
        aria-label="Regresar a la página principal"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span className="font-medium">Regresar</span>
      </Link>
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8">
        <div className="bg-[#0c2c4c] p-6 text-white rounded-xl mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <CreditCard className="mr-3" />
            Finalizar Compra
          </h2>
          <p className="mt-2">
            Complete los detalles de pago para finalizar su pedido
          </p>
        </div>

        {/* Resumen del pedido */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Resumen del pedido
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            {products.map((product: Product) => (
              <div
                key={product.id_producto}
                className="flex justify-between mb-2"
              >
                <span className="text-gray-600">{product.nombre}</span>
                <span className="text-gray-600">
                  ${Number.parseFloat(product.precio).toFixed(2)} MXN
                </span>
              </div>
            ))}
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-600">
                ${(total / 1.16).toFixed(2)} MXN
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">IVA (16%)</span>
              <span className="text-gray-600">
                ${(total - total / 1.16).toFixed(2)} MXN
              </span>
            </div>
            <div className="border-t mt-4 pt-2 flex justify-between font-medium text-[#0c2c4c]">
              <span>Total</span>
              <span>${total.toFixed(2)} MXN</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="card-element"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Información de la tarjeta
            </label>
            <div className="border border-gray-300 rounded-md p-4 focus-within:ring-2 focus-within:ring-[#0c2c4c] focus-within:border-[#0c2c4c]">
              <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
            </div>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <ShieldCheck size={14} className="mr-1" />
              Sus datos de pago están seguros y encriptados
            </div>
          </div>

          {paymentError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-start">
              <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{paymentError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing || !stripe}
            className={`w-full py-3 px-4 bg-[#0c2c4c] text-white rounded-lg flex items-center justify-center hover:bg-[#1a4b7f] transition-colors ${
              isProcessing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              "Procesando..."
            ) : (
              <>
                <span>Pagar ${total.toFixed(2)} MXN</span>
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Modales de Confirmación, Éxito y Error */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="mx-auto w-16 h-16 bg-[#0c2c4c]/10 rounded-full flex items-center justify-center mb-4">
              <CreditCard size={32} className="text-[#0c2c4c]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirmar pago
            </h3>
            <p className="text-gray-600">
              Estás a punto de realizar un pago por{" "}
              <span className="font-semibold">${total.toFixed(2)} MXN</span>
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-6">
            <div className="flex items-start">
              <AlertTriangle
                size={20}
                className="text-amber-500 mr-2 mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-amber-800">
                Al confirmar, se procesará el cargo a tu tarjeta y completará la
                compra.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={processPayment}
              className="px-4 py-2 bg-[#0c2c4c] text-white rounded-md hover:bg-[#1a4b7f] transition-colors"
            >
              Confirmar pago
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSuccessModal} onClose={handleSuccessClose}>
        <div className="p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¡Pago exitoso!
          </h3>
          <p className="text-gray-600 mb-6">
            Tu pago por{" "}
            <span className="font-semibold">${total.toFixed(2)} MXN</span> ha
            sido procesado correctamente.
          </p>
          <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
            <h4 className="font-medium text-gray-800 mb-2">
              Detalles de la compra:
            </h4>
            <p className="text-sm text-gray-600">
              <span className="block">Monto: ${total.toFixed(2)} MXN</span>
              <span className="block">
                Fecha: {new Date().toLocaleDateString()}
              </span>
              <span className="block">
                ID de transacción:{" "}
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </span>
            </p>
          </div>
          <button
            onClick={handleSuccessClose}
            className="w-full py-2 bg-[#0c2c4c] text-white rounded-md hover:bg-[#1a4b7f] transition-colors"
          >
            Continuar
          </button>
        </div>
      </Modal>

      <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <div className="p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Error en el pago
          </h3>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button
            onClick={() => setShowErrorModal(false)}
            className="w-full py-2 bg-[#0c2c4c] text-white rounded-md hover:bg-[#1a4b7f] transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
