import { useNavigate } from "react-router-dom";
import CamisaC1 from "../../assets/CamisaC1.jpg";
import CamisaC2 from "../../assets/CamisaC2.jpg";
import CamisaL1 from "../../assets/CamisaL1.jpg";
import CamisaL2 from "../../assets/CamisaL2.jpg";
import CamisaS1 from "../../assets/CamisaS1.jpg";
import CamisaS2 from "../../assets/CamisaS2.jpg";
import Taza1 from "../../assets/Taza1.jpg";
import Taza2 from "../../assets/Taza2.jpg";
import TazaM1 from "../../assets/TazaM1.jpg";
import TazaM2 from "../../assets/TazaM2.jpg";
import TazaS1 from "../../assets/TazaS1.jpg";
import TazaS2 from "../../assets/TazaS2.jpg";

function Card() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/selection");
  };
  const cards1 = [

    {
      title: "Taza Clásica",
      description: "Taza personalizada diseño completamente gratis",
      imageFront: Taza1,
      imageBack: Taza2,
    },
    {
      title: "Taza Magica",
      description: "Incluye caja personalizada diseño de taza y caja completamente gratis",
      imageFront: TazaM1,
      imageBack: TazaM2,
    },
    {
      title: "Taza Scan Me",
      description: "Regala esta canción a tu persona espexial",
      imageFront: TazaS1,
      imageBack: TazaS2,
    },
  ]


  const cards = [
    {
      title: "Playera Clásica",
      description: "100% algodón, ideal para un estilo casual y cómodo.",
      imageFront: CamisaC1,
      imageBack: CamisaC2,
    },
    {
      title: "Playera Deportiva",
      description: "Perfecta para entrenar, hecha con tela transpirable.",
      imageFront: CamisaL1,
      imageBack: CamisaL2,
    },
    {
      title: "Playera Vintage",
      description: "Un diseño retro para quienes aman el estilo clásico.",
      imageFront: CamisaS1,
      imageBack: CamisaS2,
    },
  ];

  return (
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
                <p className="text-base text-gray-700">{card.description}</p>
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
                <p className="text-base text-gray-700">{card.description}</p>
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
  );
}

export default Card;
