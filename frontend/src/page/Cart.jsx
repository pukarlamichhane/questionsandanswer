
// eslint-disable-next-line react/prop-types
function Cart({Tittle,image}) {
    return (
      <div className="flex flex-wrap ml-80 mt-1 -z-2">
  
        <div className="m-4 border-2 border-gray-300 p-4 cursor-pointer">
  
          <img src={image} alt="image" className="w-52 mb-2" />
  
          <h2 className="mb-2">{Tittle}</h2>
        </div>
  
      </div>
    );
  }
  
  export default Cart;