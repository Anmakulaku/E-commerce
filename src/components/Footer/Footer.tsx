import './Footer.css';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <div className='footer section__margin'>
      <div className='footer__container section__padding'>
        <div className='footer__logo'>
          <h1>FASCO</h1>
        </div>
        <div className='footer__links'>
          <div className='footer__links-items'>
            <NavLink to='/'> Support Center </NavLink>
            <NavLink to='/'> Careers </NavLink>
            <NavLink to='/'> Blog </NavLink>
            <NavLink to='/'> FAQ </NavLink>
          </div>
        </div>
      </div>
      <div className='footer__copyright'>
        <span>
          Copyright © 2022 Xpro & 2023 Anmakulaku. All Rights Reseved. This is educational project 
        </span>
      </div>
    </div>
  );
}
