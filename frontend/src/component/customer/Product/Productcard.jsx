// eslint-disable-next-line react/prop-types
const Productcard = ({ image, name }) => {
  return (
    <div className="w-[15rem] border  m-3 transition-all cursor-pointer">
      <div className="h-[20rem">
        <img
          className="h-full w-full object-cover object-left-top"
          src={image}
        />
      </div>
      <div className="textPart  bg-white p-3">
        <div>
          <p className="font-bold text-center opacity-100">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
