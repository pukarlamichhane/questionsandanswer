
import Header from "../../components/admin/Header";
import Asidebar from "../../components/admin/Asidebar";

const Order = () => {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // const OpenSidebar = () => {
  //   setOpenSidebarToggle(!openSidebarToggle);
  // };

  return (
    <div className="grid grid-cols-260px 1fr 1fr 1fr grid-rows-0.2fr 3fr h-screen">
      <Header  />
      <Asidebar></Asidebar>
      Order
    </div>
  );
};

export default Order;
