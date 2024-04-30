import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Homecard from "../Homesectioncard/Homecard";

const HomesecCar = () => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  // eslint-disable-next-line no-unused-vars, react/jsx-key
  const items = [1, 1, 1, 1, 1].map((item) => <Homecard></Homecard>);

  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-500">Jorden</h2>
      <div className="relative p-5">
        <AliceCarousel
          mouseTracking
          items={items}
          disableButtonsControls
          autoPlay
          autoPlayInterval={3000}
          infinite
          responsive={responsive}
        />
      </div>
    </div>
  );
};

export default HomesecCar;
