import CustomizationPanel from "./components/CustomizationPanel";
import PreviewPanel from "./components/PreviewPanel";
import TShirtDisplay from "./components/TShirtDisplay";
import { CustomizationProvider } from "./context/CustomizationContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PersonalizedTShirt() {
  return (
    <CustomizationProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-[#0c2c4c] text-white p-4 flex items-center">
          <Link
            to="/selection"
            className="flex items-center text-white hover:text-gray-300 transition"
            aria-label="Regresar a la selección"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            <span className="font-medium">Regresar</span>
          </Link>
          <h1 className="text-xl font-bold mx-auto" aria-label="Personalización de Playera">
            Personalización de Playera
          </h1>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow p-4">
          {/* Panel de personalización */}
          <div className="rounded-xl bg-white p-4 shadow-md h-full">
            <CustomizationPanel />
          </div>

          {/* Vista previa de la playera */}
          <div
            className="flex items-center justify-center rounded-xl bg-white p-4 shadow-md h-full"
            aria-label="Vista previa de la playera"
          >
            <TShirtDisplay />
          </div>

          {/* Panel de vista previa */}
          <div className="rounded-xl bg-white p-4 shadow-md flex flex-col h-full">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </CustomizationProvider>
  );
}