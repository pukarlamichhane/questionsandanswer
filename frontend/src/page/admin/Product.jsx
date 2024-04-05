
import Header from "../../components/admin/Header";
import Views from "../../components/admin/Views";


const AdminProduct = () => {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // const OpenSidebar = () => {
  //   setOpenSidebarToggle(!openSidebarToggle);
  // };

  return (
    <div className="grid grid-cols-260px 1fr 1fr 1fr grid-rows-0.2fr 3fr h-screen">
      <Header  />
      <Views></Views>
    </div>
  );
};

export default AdminProduct;
