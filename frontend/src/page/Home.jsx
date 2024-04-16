import { useState } from 'react';
import Navbar from '../components/Customer/Navbar';
import Product from '../components/Customer/Product';
import Recomendation from '../components/Customer/Recomendation';
import Sidebar from '../components/Customer/Sidebar';
import products from "../page/cus/data";
import Cart from './Cart';



const Home = () => {

  const[selectcategory,setselectcategory]=useState(null)


  const[Query,setQuery]=useState("")

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(Query.toLowerCase()) !== -1
  );

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    setselectcategory(event.target.value)
  };

  const handleClick = (event) => {
    setselectcategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title,  }) => (
        <Cart
          key={Math.random()}
          img={img}
          title={title}
        />
      )
    );
  }

  const result = filteredData(products, selectcategory, Query);
  
  return (
    <div className='p-0 m-0 box-border font-sans'>
      <Sidebar handleChange={handleChange} />
      <Navbar query={Query} handleInputChange={handleInputChange} />
      <Recomendation handleClick={handleClick} />
      <Product result={result} />
    </div>
  )
}

export default Home


