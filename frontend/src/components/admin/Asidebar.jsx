import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function Asidebar() {
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname === '/dashboard');
  }, [location]);

  return (
    <aside className={`sidebar-responsive fixed top-0 left-0 h-full bg-gray-900 text-white w-64`}>
      <div className='sidebar-title flex justify-between items-center px-6 py-4'>
          <div className='sidebar-brand flex items-center'>
              <BsCart3 className='icon_header text-xl'/> 
              <span className="ml-2 font-semibold">SHOP</span>
          </div>
          <span className='icon close_icon text-red-500 text-lg cursor-pointer'>X</span>
      </div>

      <ul className='sidebar-list p-0'>
          <li className={`sidebar-list-item py-4 px-6 ${isDashboard ? 'hover:bg-blue-800 hover:text-white' : ''}`}>
              <a href="" className="flex items-center">
                  <BsGrid1X2Fill className='icon'/>
                  <span className="ml-2">Dashboard</span>
              </a>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <a href="" className="flex items-center">
                  <BsFillArchiveFill className='icon'/>
                  <span className="ml-2">Products</span>
              </a>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <a href="" className="flex items-center">
                  <BsFillGrid3X3GapFill className='icon'/>
                  <span className="ml-2">Categories</span>
              </a>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <a href="" className="flex items-center">
                  <BsPeopleFill className='icon'/>
                  <span className="ml-2">Customers</span>
              </a>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <a href="" className="flex items-center">
                  <BsListCheck className='icon'/>
                  <span className="ml-2">Inventory</span>
              </a>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <a href="" className="flex items-center">
                  <BsMenuButtonWideFill className='icon'/>
                  <span className="ml-2">Reports</span>
              </a>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <a href="" className="flex items-center">
                  <BsFillGearFill className='icon'/>
                  <span className="ml-2">Setting</span>
              </a>
          </li>
      </ul>
    </aside>
  );
}

export default Asidebar;
