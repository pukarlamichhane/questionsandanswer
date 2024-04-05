
import Header from "../../components/admin/Header";
import Vorder from "../../components/admin/Vorder";


const Order = () => {

  return (
    <div className="grid grid-cols-260px 1fr 1fr 1fr grid-rows-0.2fr 3fr h-screen">
      <Header  />
      <Vorder></Vorder>
    </div>
  );
};

export default Order;
