import Input from "./Input";

function Category() {
  return (
    <div>
      <h2 className="text-2xl font-normal mb-5">Category</h2>

      <div className="space-y-2">
        <label className="flex items-center cursor-pointer">
          <input  type="radio" value="" name="test" />
          <span className="ml-6 w-5 h-5  mr-2">All</span>
        </label>
        <Input
          value="sneakers"
          title="Sneakers"
          name="test"
        />
        <Input
          value="flats"
          title="Flats"
          name="test"
        />
        <Input
          value="sandals"
          title="Sandals"
          name="test"
        />
        <Input

          value="heels"
          title="Heels"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
