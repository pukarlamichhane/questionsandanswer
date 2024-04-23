import { MainCarousalData } from "./Maindata";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarousal = () => {
  // eslint-disable-next-line react/jsx-key
  const items = MainCarousalData.map((item) => (
    // eslint-disable-next-line react/jsx-key
    <img
      className="w-[60rem] cursor-pointer"
      role="presentation"
      src={item.image}
      alt="/"
    ></img>
  ));
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={1000}
      infinite
    />
  );
};

export default MainCarousal;
