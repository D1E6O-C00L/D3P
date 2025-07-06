import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";

const whatsapp = `${BASE_CLOUDINARY}/v1751754914/social_phiqm9.png`;

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/5219982327523?text=Hola,%20me%20comunico%20con%20ustedes%20a%20traves%20de%20su%20pagina%20D3P,%20porque%20tengo%20dudas"
      target="_blank"
      id="whatsapp-icon"
      className="whatsapp-icon"
    >
      <img src={whatsapp} alt="WhatsApp" />
    </a>
  );
};

export default WhatsAppIcon;
