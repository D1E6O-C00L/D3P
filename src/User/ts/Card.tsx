import Image from '../../assets/D3P.jpg';

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