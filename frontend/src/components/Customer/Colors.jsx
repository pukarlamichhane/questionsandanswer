import Input from "./Input";

function Colors() {
  return (
    <div>
      <h2 className="text-2xl font-normal mb-5">Category</h2>

      <div className="space-y-2">
        <label className="flex items-center cursor-pointer">
          <input  type="radio" value="" name="test" />
          <span className="ml-6 w-5 h-5  mr-2">All</span>
        </label>
        <Input
          value="Green"
          title="Green"
          name="test"
        />
        <Input
          value="Black"
          title="Black"
          name="test"
        />
        <Input
          value="White"
          title="White"
          name="test"
        />
        <Input

          value="Blue"
          title="Blue"
          name="test"
        />
      </div>
    </div>
  );
}

export default Colors;
