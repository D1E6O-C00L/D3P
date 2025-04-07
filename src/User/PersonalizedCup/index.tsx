import { Suspense, lazy } from "react";
import { CustomizationProvider } from "./context/CustomizationContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load components for better performance
const CustomizationPanel = lazy(() => import("./components/CustomizationPanel"));
const PreviewPanel = lazy(() => import("./components/PreviewPanel"));
const CupDisplay = lazy(() => import("./components/CupDisplay"));

export default function PersonalizedCup() {
  return (
    <CustomizationProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-[#0c2c4c] text-white p-4 flex items-center">
          <Link
            to="/selection"
            className="flex items-center text-white hover:text-gray-300 transition"
            aria-label="Regresar a la selección de productos"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            <span className="font-medium">Regresar</span>
          </Link>
          <h1 className="text-xl font-bold mx-auto" aria-label="Título de la página">
            Personalización de Taza
          </h1>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow p-4">
          {/* Customization Panel */}
          <Suspense fallback={<div className="text-center">Cargando panel de personalización...</div>}>
            <div className="rounded-xl bg-white p-4 shadow-md h-full">
              <CustomizationPanel />
            </div>
          </Suspense>

          {/* Cup Display */}
          <Suspense fallback={<div className="text-center">Cargando vista de la taza...</div>}>
            <div className="flex items-center justify-center rounded-xl bg-white p-4 shadow-md h-full">
              <CupDisplay />
            </div>
          </Suspense>

          {/* Preview Panel */}
          <Suspense fallback={<div className="text-center">Cargando vista previa...</div>}>
            <div className="rounded-xl bg-white p-4 shadow-md flex flex-col h-full">
              <PreviewPanel />
            </div>
          </Suspense>
        </div>
      </div>
    </CustomizationProvider>
  );
}