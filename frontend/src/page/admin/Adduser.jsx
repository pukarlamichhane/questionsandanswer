import Auser from "../../components/admin/Auser";
import AHeader from "../../components/admin/Header";

const Adduser = () => {
  return (
    <div>
      <div className="grid grid-cols-260px 1fr 1fr 1fr grid-rows-0.2fr 3fr h-screen">
        <AHeader></AHeader>
        <Auser></Auser>
      </div>
    </div>
  );
};

export default Adduser;
