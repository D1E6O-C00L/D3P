import { useNavigate } from "react-router-dom";
import "../../css/index.css";
import "../../css/whatsapp.css";
import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";
import WhatsAppIcon from "../../components/WhatsApp/WhatsAppIcon";
import { useCurrency } from "../../context/CurrencyContext"; 

function Card() {
  const navigate = useNavigate();
  const { currency, rate } = useCurrency(); 

  const handleButtonClick = () => {
    navigate("/selection");
  };

  const formatPrice = (price: number) => {
    const converted = currency === "USD" ? price / rate : price;
    const symbol = currency === "USD" ? "USD $" : "MXN $";
    return `${symbol}${converted.toFixed(2)}`;
  };

  const cards = [
    {
      title: "Playera Clásica",
      description: "100% algodón, ideal para un estilo casual y cómodo.",
      price: 169,
      imageFront: `${BASE_CLOUDINARY}/v1751579320/CamisaC1_nl9jbg.jpg`,
      imageBack: `${BASE_CLOUDINARY}/v1751579319/CamisaC2_gkzsjc.jpg`,
    },
    {
      title: "Playera Deportiva",
      description: "Perfecta para entrenar, hecha con tela transpirable.",
      price: 199,
      imageFront: `${BASE_CLOUDINARY}/v1751579319/CamisaL1_mqmohi.jpg`,
      imageBack: `${BASE_CLOUDINARY}/c_crop,w_1166,h_1170/v1751579319/CamisaL2_nf4men.jpg`,
    },
    {
      title: "Playera Vintage",
      description: "Un diseño retro para quienes aman el estilo clásico.",
      price: 179,
      imageFront: `${BASE_CLOUDINARY}/v1751579319/CamisaS1_lvnnd7.jpg`,
      imageBack: `${BASE_CLOUDINARY}/c_crop,w_1145,h_1160/v1751579319/CamisaS2_erkctf.jpg`,
    },
  ];

  const cards1 = [
    {
      title: "Taza Clásica",
      description: "Taza personalizada diseño completamente gratis",
      price: 119,
      imageFront: `${BASE_CLOUDINARY}/v1751579326/Taza1_exqngq.jpg`,
      imageBack: `${BASE_CLOUDINARY}/v1751579326/Taza2_ewphqs.jpg`,
    },
    {
      title: "Taza Mágica",
      description:
        "Incluye caja personalizada, diseño de taza y caja completamente gratis",
      price: 139,
      imageFront: `${BASE_CLOUDINARY}/v1751579326/TazaM1_hqus3z.jpg`,
      imageBack: `${BASE_CLOUDINARY}/v1751579326/TazaM2_nl72yg.jpg`,
    },
    {
      title: "Taza Scan Me",
      description: "Regala esta canción a tu persona especial",
      price: 149,
      imageFront: `${BASE_CLOUDINARY}/v1751579326/TazaS1_rkbs9x.jpg`,
      imageBack: `${BASE_CLOUDINARY}/v1751579326/TazaS2_lidgev.jpg`,
    },
  ];

  return (
    <>
      <div className="w-full bg-[#0c2c4c] text-white p-12 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full">
          <h2 className="text-5xl font-bold text-center ">Playeras</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 mb-20">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white text-[#0c2c4c] rounded-2xl shadow-xl overflow-hidden relative transition-transform duration-300 hover:scale-105"
              >
                <div className="relative group">
                  <img
                    src={card.imageFront}
                    alt={card.title}
                    className="w-full h-100 object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                  />
                  <img
                    src={card.imageBack}
                    alt={`${card.title} - Back`}
                    className="absolute top-0 left-0 w-full h-100 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-base text-gray-700 mb-2">{card.description}</p>
                  <p className="text-lg font-semibold">{formatPrice(card.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-5xl font-bold text-center ">Tazas</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 mb-20">
            {cards1.map((card, index) => (
              <div
                key={index}
                className="bg-white text-[#0c2c4c] rounded-2xl shadow-xl overflow-hidden relative transition-transform duration-300 hover:scale-105"
              >
                <div className="relative group">
                  <img
                    src={card.imageFront}
                    alt={card.title}
                    className="w-full h-100 object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                  />
                  <img
                    src={card.imageBack}
                    alt={`${card.title} - Back`}
                    className="absolute top-0 left-0 w-full h-100 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-base text-gray-700 mb-2">{card.description}</p>
                  <p className="text-lg font-semibold">{formatPrice(card.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-5xl font-bold text-center ">
            Dale vida a esa idea que tienes en mente
          </h2>
          <button
            className="block mx-auto bg-white text-[#0c2c4c] font-bold py-4 px-8 rounded-full text-lg mt-12 hover:bg-gray-200 transition-colors duration-300"
            onClick={handleButtonClick}
          >
            Personalizar Ahora
          </button>
        </div>
      </div>
      <WhatsAppIcon />
    </>
  );
}

export default Card;
