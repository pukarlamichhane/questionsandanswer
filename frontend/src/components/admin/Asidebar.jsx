import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function Asidebar() {
  return (
    <aside  className="sidebar-responsive">
        <div className='sidebar-title flex justify-between items-center px-6 py-4'>
            <div className='sidebar-brand flex items-center'>
                <BsCart3 className='icon_header text-xl text-white'/> 
                <span className="ml-2 text-white font-semibold">SHOP</span>
            </div>
            <span className='icon close_icon text-red-500 text-lg cursor-pointer'>X</span>
        </div>

        <ul className='sidebar-list p-0'>
            <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800'>
                <a href="" className="flex items-center">
                    <BsGrid1X2Fill className='icon text-white'/>
                    <span className="ml-2 text-white">Dashboard</span>
                </a>
            </li>
            <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800'>
                <a href="" className="flex items-center">
                    <BsFillArchiveFill className='icon text-white'/>
                    <span className="ml-2 text-white">Products</span>
                </a>
            </li>
            <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800'>
                <a href="" className="flex items-center">
                    <BsFillGrid3X3GapFill className='icon text-white'/>
                    <span className="ml-2 text-white">Categories</span>
                </a>
            </li>
            <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800'>
                <a href="" className="flex items-center">
                    <BsPeopleFill className='icon text-white'/>
                    <span className="ml-2 text-white">Customers</span>
                </a>
            </li>
            <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800'>
                <a href="" className="flex items-center">
                    <BsListCheck className='icon text-white'/>
                    <span className="ml-2 text-white">Inventory</span>
                </a>
            </li>
            <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800'>
                <a href="" className="flex items-center">
                    <BsMenuButtonWideFill className='icon text-white'/>
                    <span className="ml-2 text-white">Reports</span>
                </a>
            </li>
            <li className='sidebar-list-item py-4 px-6 hover:bg-blue-800'>
                <a href="" className="flex items-center">
                    <BsFillGearFill className='icon text-white'/>
                    <span className="ml-2 text-white">Setting</span>
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default Asidebar;
