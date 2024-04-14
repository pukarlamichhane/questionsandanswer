
import Navbar from '../components/Customer/Navbar';
import Product from '../components/Customer/Product';
import Recomendation from '../components/Customer/Recomendation';
import Sidebar from '../components/Customer/Sidebar';


const Home = () => {

  // const[selectcategory,setselectcategory]=useState(null)

  // const[query,setquery]=useState("")

  // const filteredItems = products.filter(
  //   (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  // );


  // const handleChange = (event) => {
  //   setselectcategory(event.target.value)
  // };

  // const handleClick = (event) => {
  //   setselectcategory(event.target.value);
  // };

  // function filteredData(products, selected, query) {
  //   let filteredProducts = products;

  //   if (query) {
  //     filteredProducts = filteredItems;
  //   }

  //   if (selected) {
  //     filteredProducts = filteredProducts.filter(
  //       ({ category, color, company, newPrice, title }) =>
  //         category === selected ||
  //         color === selected ||
  //         company === selected ||
  //         newPrice === selected ||
  //         title === selected
  //     );
  //   }

  //   return filteredProducts.map(
  //     ({ img, title, star, reviews, prevPrice, newPrice }) => (
  //       <Card
  //         key={Math.random()}
  //         img={img}
  //         title={title}
  //         star={star}
  //         reviews={reviews}
  //         prevPrice={prevPrice}
  //         newPrice={newPrice}
  //       />
  //     )
  //   );
  // }

  // const result = filteredData(products, selectedCategory, query);
  
  return (
    <div className='p-0 m-0 box-border font-sans'>
      <Sidebar></Sidebar>
      <Navbar></Navbar>
      <Recomendation></Recomendation>
      <Product></Product>
    </div>
  )
}

export default Home


