import React from "react";

interface DescargarExcelProps {
  children?: React.ReactNode;
}

const DescargarExcel: React.FC<DescargarExcelProps> = ({ children }) => {
  const handleDescarga = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/productos/download-excel");
      if (!response.ok) throw new Error("No se pudo generar el archivo Excel.");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "productos.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
    }
  };

  return (
    <button
      onClick={handleDescarga}
      className="bg-transparent p-0 m-0 border-0 flex items-center"
      title="Descargar Excel"
      type="button"
    >
      {children ? children : "Descargar Excel"}
    </button>
  );
};

export default DescargarExcel;