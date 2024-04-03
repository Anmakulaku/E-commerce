import { NavLink } from 'react-router-dom';
import './Navbar.css';
import CartButton from './CartButton';

export function Navbar() {
  return (
    <div className='nav section__margin'>
      <div className='nav__container'>
        <div className='nav__logo'>
          <h1>FASCO</h1>
        </div>
        <div className='nav__links'>
          <div className='nav__links-items'>
            <NavLink to='/'> Home </NavLink>
            <NavLink to='/store'> Store </NavLink>
          </div>
          <div className='nav__cart'>
            <CartButton />
          </div>
        </div>
      </div>
    </div>
  );
}
