import { NavLink } from 'react-router-dom';
import './Navbar.css';
import CartButton from './CartButton';

export function Navbar() {
  return (
    <nav className='nav section__margin'>
      <div className='nav__container'>
        <div className='nav__logo'>
          <NavLink to='/'>
            <h1>FASCO</h1>
          </NavLink>
        </div>
        <div className='nav__links'>
          <div className='nav__links-items'>
            <NavLink to='/' aria-label='Go to home page'>
              {' '}
              Home{' '}
            </NavLink>
            <NavLink to='/store' aria-label='Go to store'>
              {' '}
              Store{' '}
            </NavLink>
          </div>
          <div className='nav__cart'>
            <CartButton aria-label='Open cart' />
          </div>
        </div>
      </div>
    </nav>
  );
}
