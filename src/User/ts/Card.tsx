import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";

const Image = `${BASE_CLOUDINARY}/v1751579320/D3P_o3uuho.jpg`;

function Card() {
  return (
    <div className="relative py-20 flex flex-col items-center overflow-hidden bg-white">
      <div className="flex justify-center">
        <img
          src={Image}
          alt="Imagen Principal"
          className="w-[90%] max-w-[50rem]"
        />
      </div>
    </div>
  );
}

export default Card;