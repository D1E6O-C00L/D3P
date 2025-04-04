import img1 from "../../assets/impresion.jpg";
import img2 from "../../assets/personalizacion.jpg";
import img3 from "../../assets/diseno.jpg";
import Header from "../ts/Header";
import Footer from "../ts/footer";

function Categories() {
  return (
    <div className="top-0">
      <Header />
      <div className="flex flex-col gap-2 bg-[#0c2c4c] min-h-screen p-2 ">

      <div className="flex flex-col md:flex-row bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] rounded-lg overflow-hidden h-[300px] md:h-[320px]">
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#0c2c4c]">Impresión</h2>
          <p className="text-lg text-[#0c2c4c] mb-2">
            Técnicas avanzadas de impresión en la más alta calidad. 
          </p>
          <ul className="list-disc list-inside text-[#0c2c4c] space-y-1">
            <li>Sublimación</li>
            <li>Vinil Textil</li>
            <li>DTF</li>
          </ul>
        </div>
        <div className="flex-1">
          <img
            src={img1}
            alt="Impresión"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] rounded-lg overflow-hidden h-[300px] md:h-[320px]">
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#0c2c4c]">Personalización</h2>
          <p className="text-lg text-[#0c2c4c] mb-2">
            Llevamos la personalización de tus artículos al siguiente nivel.
          </p>
          <ul className="list-disc list-inside text-[#0c2c4c] space-y-1">
            <li>Tazas</li>
            <li>Playeras</li>
            <li>Vasos</li>
            <li>Llaveros</li>
          </ul>
        </div>
        <div className="flex-1">
          <img
            src={img2}
            alt="Personalización"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] rounded-lg overflow-hidden h-[300px] md:h-[320px]">
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#0c2c4c]">Diseño</h2>
          <p className="text-lg text-[#0c2c4c] mb-2">
            ¿Tienes una idea en mente? ¡Te ayudamos a hacerla realidad!
          </p>
          <ul className="list-disc list-inside text-[#0c2c4c] space-y-1">
            <li>Logos</li>
            <li>Brand Empresarial</li>
            <li>Diseño de Marca</li>
            <li>UX/UI</li>
          </ul>
        </div>
        <div className="flex-1">
          <img
            src={img3}
            alt="Diseño"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
}

export default Categories;
