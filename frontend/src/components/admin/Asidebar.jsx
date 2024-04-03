import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {  BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function Asidebar() {
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname === '/dashboard');
  }, [location]);

  return (
    <aside className={`sidebar-responsive fixed top-0 left-0 h-full bg-white-900 text-black w-64 mt-16 border-r border-gray-300`}>
      <ul className='sidebar-list p-0'>
          <li className={`sidebar-list-item py-4 px-6 ${isDashboard ? 'hover:bg-blue-800 hover:text-white' : ''}`}>
              <Link to="/dashboard" className="flex items-center">
                  <BsGrid1X2Fill className='icon'/>
                  <span className="ml-2">Dashboard</span>
              </Link>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <Link to="/products" className="flex items-center">
                  <BsFillArchiveFill className='icon'/>
                  <span className="ml-2">Products</span>
              </Link>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <Link to="/categories" className="flex items-center">
                  <BsFillGrid3X3GapFill className='icon'/>
                  <span className="ml-2">Categories</span>
              </Link>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <Link to="/customers" className="flex items-center">
                  <BsPeopleFill className='icon'/>
                  <span className="ml-2">Customers</span>
              </Link>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <Link to="/inventory" className="flex items-center">
                  <BsListCheck className='icon'/>
                  <span className="ml-2">Inventory</span>
              </Link>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <Link to="/reports" className="flex items-center">
                  <BsMenuButtonWideFill className='icon'/>
                  <span className="ml-2">Reports</span>
              </Link>
          </li>
          <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800 hover:text-white'>
              <Link to="/settings" className="flex items-center">
                  <BsFillGearFill className='icon'/>
                  <span className="ml-2">Setting</span>
              </Link>
          </li>
      </ul>
    </aside>
  );
}

export default Asidebar;
