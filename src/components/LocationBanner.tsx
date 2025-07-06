import { useEffect, useState } from "react";

interface Ubicacion {
  ciudad: string;
  region: string;
  pais: string;
  codigoPostal: string;
}

interface Clima {
  temp: number;
  description: string;
}

export default function LocationBanner() {
  const [ubi, setUbi] = useState<Ubicacion | null>(null);
  const [clima, setClima] = useState<Clima | null>(null);
  const [fx, setFx] = useState<number | null>(null);   // 👈 tipo de cambio real

  useEffect(() => {
    (async () => {
      try {
        const [resUbi, resClima, resFx] = await Promise.all([
          fetch("http://localhost:8888/api/ubicacion"),
          fetch("http://localhost:8888/api/weather"),
          fetch("http://localhost:8888/api/tipo-cambio"),
        ]);

        const { ubicacion } = await resUbi.json();
        const { clima } = await resClima.json();
        const { cambio } = await resFx.json();          // { cambio: 18.63 }

        setUbi(ubicacion);
        setClima(clima);
        setFx(Number(cambio));
      } catch (err) {
        console.error("Error obteniendo datos:", err);
      }
    })();
  }, []);

  if (!ubi || !clima || fx == null) return null;

  return (
    <div className="marquee-container relative h-8 bg-white py-2 px-4 text-[#0c2c4c] text-xs md:text-sm flex items-center overflow-hidden mt-[45px]">
      <span className="marquee-text flex items-center gap-2 whitespace-nowrap">
        📦 ¡Envíos hasta <strong>{ubi.ciudad}</strong>, {ubi.region}, {ubi.pais} – C.P. {ubi.codigoPostal}
        | 🌡️ {Math.round(clima.temp)} °C · {clima.description}
        | Tipo de cambio: 1 USD ≈ {fx.toFixed(2)} MXN
      </span>
    </div>
  );
}
