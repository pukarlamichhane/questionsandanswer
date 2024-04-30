import MainCarousal from "../HomeCarousal/MainCarousal";
import HomesecCar from "../HomesectionCarousal/HomesecCar";

const Homepage = () => {
  return (
    <div>
      <MainCarousal className="w-10"></MainCarousal>
      <div className="space-y-10 py-20 flex flex-col justify-center">
        <HomesecCar></HomesecCar>
        <HomesecCar></HomesecCar>
      </div>
    </div>
  );
};

export default Homepage;
