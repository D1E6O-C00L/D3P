import React, { useEffect, lazy, Suspense } from "react";

// Lazy load icons for better performance
const AlertCircle = lazy(() => import("lucide-react").then((mod) => ({ default: mod.AlertCircle })));
const CheckCircle = lazy(() => import("lucide-react").then((mod) => ({ default: mod.CheckCircle })));
const Info = lazy(() => import("lucide-react").then((mod) => ({ default: mod.Info })));
const X = lazy(() => import("lucide-react").then((mod) => ({ default: mod.X })));
const XCircle = lazy(() => import("lucide-react").then((mod) => ({ default: mod.XCircle })));

interface ModalAlertProps {
  message: string;
  onConfirm?: () => void;
  onClose: () => void;
  showButtons?: boolean;
  type?: "success" | "error" | "warning" | "info";
  title?: string;
}

const ModalAlert: React.FC<ModalAlertProps> = React.memo(({
  message,
  onConfirm,
  onClose,
  showButtons = false,
  type = "info",
  title,
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  // Alert type configuration
  const alertConfig = {
    success: {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      color: "bg-green-50 border-green-500",
      buttonColor: "bg-green-600 hover:bg-green-700",
      title: title || "¡Éxito!",
    },
    error: {
      icon: <XCircle className="w-8 h-8 text-red-500" />,
      color: "bg-red-50 border-red-500",
      buttonColor: "bg-red-600 hover:bg-red-700",
      title: title || "Error",
    },
    warning: {
      icon: <AlertCircle className="w-8 h-8 text-amber-500" />,
      color: "bg-amber-50 border-amber-500",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      title: title || "Advertencia",
    },
    info: {
      icon: <Info className="w-8 h-8 text-[#0c2c4c]" />,
      color: "bg-blue-50 border-[#0c2c4c]",
      buttonColor: "bg-[#0c2c4c] hover:bg-[#1a4b7f]",
      title: title || "Información",
    },
  };

  const config = alertConfig[type];

  return (
    <div
      className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="alert"
      aria-live="assertive"
      aria-modal="true"
    >
      <div
        className={`rounded-lg shadow-xl w-full max-w-md border-l-4 ${config.color} bg-white animate-fade-in-up overflow-hidden`}
        role="alertdialog"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
      >
        <div className="flex justify-between items-start p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <Suspense fallback={<span className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
                {config.icon}
              </Suspense>
            </div>
            <div>
              <h3
                id="alert-title"
                className="text-lg font-semibold text-gray-900"
              >
                {config.title}
              </h3>
              <p
                id="alert-message"
                className="mt-2 text-gray-700"
              >
                {message}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Cerrar"
          >
            <Suspense fallback={<span className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />}>
              <X className="w-5 h-5" />
            </Suspense>
          </button>
        </div>

        {(showButtons || onConfirm) && (
          <div className="px-4 py-3 bg-gray-50 flex justify-end gap-3 border-t">
            {showButtons && (
              <button
                onClick={onClose}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 py-2 rounded-md text-sm transition-colors shadow-sm"
              >
                Cancelar
              </button>
            )}
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className={`${config.buttonColor} text-white font-medium px-4 py-2 rounded-md text-sm transition-colors shadow-sm`}
            >
              Aceptar
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default ModalAlert;