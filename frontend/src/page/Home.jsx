import Navbar from '../components/Customer/Navbar';
import Recomendation from '../components/Customer/Recomendation';
import Sidebar from '../components/Customer/Sidebar';

const Home = () => {
  return (
    <div className='p-0 m-0 box-border font-sans'>
      <Sidebar></Sidebar>
      <Navbar></Navbar>
      <Recomendation></Recomendation>
    </div>
  )
}

export default Home


