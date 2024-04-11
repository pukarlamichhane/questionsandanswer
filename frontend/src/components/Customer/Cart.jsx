
function Card() {
    return (
      <div className="flex flex-wrap ml-80 mt-1 -z-2">
  
        <div className="m-4 border-2 border-gray-300 p-4 cursor-pointer">
  
          <img src="..." alt="..." className="w-52 mb-2" />
  
          <h2 className="mb-2">Card Title</h2>
  
          <div className="mb-2 flex">
  
            <svg className="w-5 h-5 text-gold fill-current">
              <path d="M11.6 0L14.12 5.33H20.24L15.84 8.66L18.36 13.99L13.95 11.99L9.55 13.99L12.07 8.66L7.67 5.33H13.8L11.6 0Z" />
            </svg>
  
            <span className="text-sm ml-1">4.5</span>
  
            <span className="text-sm ml-2"> (120 reviews)</span>
  
          </div>
  
          <div className="flex justify-between items-center">
  
            <span className="text-gray-700">$25</span>
  
            <svg className="w-5 h-5 text-gray-600 fill-current">
              <path d="M17.5 10H6.5C5.39543 10 4.5 10.8954 4.5 12V18C4.5 19.1046 5.39543 20 6.5 20H17.5C18.6046 20 19.5 19.1046 19.5 18V12C19.5 10.8954 18.6046 10 17.5 10ZM17.5 18H6.5V12H17.5V18ZM8.5 8L9.67 3.34C9.78105 3.04659 10.0734 2.85927 10.3842 2.9129C10.695 2.96654 10.9327 3.24211 10.8763 3.55302L10 8H8.5ZM15.5 8H13.9989L13.1237 3.55302C13.0673 3.24211 13.305 2.96654 13.6158 2.9129C13.9266 2.85927 14.2189 3.04659 14.33 3.34L15.5 8Z" />
            </svg>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default Card;
  