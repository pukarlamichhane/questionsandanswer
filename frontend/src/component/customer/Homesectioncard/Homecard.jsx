const Homecard = () => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-1">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src="https://sneakerbardetroit.com/wp-content/uploads/2019/07/Air-Jordan-11-Bred-378037-061-2019-OG-2019-Box.jpg"
          alt="/"
        ></img>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-500">Blue</h3>
      </div>
    </div>
  );
};

export default Homecard;
