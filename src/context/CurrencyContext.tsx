import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Currency = "MXN" | "USD";

interface CurrencyCtx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rate: number; // cuántos MXN = 1 USD (1 si MXN activo)
}

const CurrencyContext = createContext<CurrencyCtx | null>(null);
export const useCurrency = () => useContext(CurrencyContext)!;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [rate, setRate] = useState(1); // MXN por USD

  // solo baja el tipo de cambio una vez
  useEffect(() => {
    fetch("http://localhost:8888/api/tipo-cambio")
      .then((r) => r.json())
      .then(({ cambio }) => setRate(Number(cambio)))
      .catch(console.error);
  }, []);

  const value: CurrencyCtx = {
    currency,
    setCurrency,
    rate: currency === "MXN" ? 1 : rate, // si MXN => 1, si USD => rate real
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
