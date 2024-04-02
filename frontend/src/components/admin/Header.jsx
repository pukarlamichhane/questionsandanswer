import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header() {
  return (
    <header className='header bg-gray-800 text-white px-6 py-4 flex justify-between items-center'>
        <div className='menu-icon'>
            <BsJustify className='icon' />
        </div>
        <div className='header-left'>
            <BsSearch className='icon' />
        </div>
        <div className='header-right flex'>
            <BsFillBellFill className='icon mr-4' />
            <BsFillEnvelopeFill className='icon mr-4' />
            <BsPersonCircle className='icon' />
        </div>
    </header>
  );
}

export default Header;
