/* eslint-disable react/prop-types */
const Productcard = ({ image, name }) => {
  return (
    <div className="w-60 h-72 border rounded-lg m-3 transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="h-3/4 rounded-t-lg overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={image}
          alt={name}
        />
      </div>
      <div className="bg-white p-3 rounded-b-lg flex justify-center items-center">
        <p className="font-bold text-center opacity-100">{name}</p>
      </div>
    </div>
  );
};

export default Productcard;
