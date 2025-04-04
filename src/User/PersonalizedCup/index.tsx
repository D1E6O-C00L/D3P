import CustomizationPanel from "./components/CustomizationPanel";
import PreviewPanel from "./components/PreviewPanel";
import CupDisplay from "./components/CupDisplay";
import { CustomizationProvider } from "./context/CustomizationContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PersonalizedCup() {
  return (
    <CustomizationProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        
        <div className="bg-[#0c2c4c] text-white p-4 flex items-center">
          <Link
            to="/selection"
            className="flex items-center text-white hover:text-gray-300 transition"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            <span className="font-medium">Regresar</span>
          </Link>
          <h1 className="text-xl font-bold mx-auto">
            Personalización de Playera
          </h1>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow p-4">
          <div className="rounded-xl bg-white p-4 shadow-md h-full">
            <CustomizationPanel />
          </div>

          <div className="flex items-center justify-center rounded-xl bg-white p-4 shadow-md h-full">
            <CupDisplay />
          </div>

          <div className="rounded-xl bg-white p-4 shadow-md flex flex-col h-full">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </CustomizationProvider>
  );
}
