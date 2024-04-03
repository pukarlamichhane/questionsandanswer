import Input from "./Input";

const Colors = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-normal mb-5 mt-9">Colors</h2>
        <label className="flex items-center cursor-pointer">
          <input type="radio" value="" name="test1" className="hidden" />
          <span className="w-5 h-5 rounded-full mr-2 bg-gradient-to-br from-blue-500 to-red-500"></span>
          All
        </label>

        <Input
          value="black"
          title="Black"
          name="test1"
          color="bg-black"
          className="mt-4" // Increased margin-top here
        />

        <Input
          value="blue"
          title="Blue"
          name="test1"
          color="bg-blue-500"
          className="mt-4" // Increased margin-top here
        />

        <Input
          value="red"
          title="Red"
          name="test1"
          color="bg-red-500"
          className="mt-4" // Increased margin-top here
        />

        <Input
          value="green"
          title="Green"
          name="test1"
          color="bg-green-500"
          className="mt-4" // Increased margin-top here
        />

        <label className="flex items-center cursor-pointer">
          <input type="radio" value="white" name="test1" className="hidden" />
          <span className="w-5 h-5 rounded-full mr-2 border-2 border-black bg-white"></span>
          White
        </label>
      </div>
    </>
  );
};

export default Colors;
