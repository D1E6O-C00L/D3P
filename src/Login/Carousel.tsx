import { useState, useEffect } from "react";
import imagen1 from "../assets/CamisaC1.jpg";
import imagen2 from "../assets/Taza1.jpg";
import imagen3 from "../assets/TazaM2.jpg";

function Carousel() {
    const [activeImage, setActiveImage] = useState(0);
    const images = [imagen1, imagen2, imagen3];
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % images.length)
        }, 3000);

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="relative max-h-full max-w-lg bg-amber-400 overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeImage * 100}%)` }}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Slide ${index}`}
                            className="w-full flex-shrink-0 object-cover" />
                    ))}
                </div>
            </div>
    );
}

export default Carousel;
