import AProduct from "../../components/admin/Aproduct";
import AHeader from "../../components/admin/Header";

const Addproduct = () => {
  return (
    <div className="grid grid-cols-260px 1fr 1fr 1fr grid-rows-0.2fr 3fr h-screen">
      <AHeader></AHeader>
      <AProduct></AProduct>
    </div>
  );
};

export default Addproduct;
