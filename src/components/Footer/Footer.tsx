import './Footer.css';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <footer className='footer section__margin'>
      <div className='footer__container section__padding'>
        <div className='footer__logo'>
          <h1>FASCO</h1>
        </div>
        <nav className='footer__links'>
          <div className='footer__links-items'>
            <NavLink to='/'> Support Center </NavLink>
            <NavLink to='/'> Careers </NavLink>
            <NavLink to='/'> Blog </NavLink>
            <NavLink to='/'> FAQ </NavLink>
          </div>
        </nav>
      </div>
      <div className='footer__copyright'>
        <p>
          Copyright © 2022 Xpro & 2023 Anmakulaku. All Rights Reserved. This is
          an educational project.
        </p>
      </div>
    </footer>
  );
}
