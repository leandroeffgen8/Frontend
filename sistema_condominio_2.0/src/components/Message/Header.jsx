import './Header.css';

import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux'; 

//Redux

const Header = () => {

  const { auth } = useAuth();
  const { user } = useSelector(state => state.user)

  return (
    <header>
      <div id="nav">
        <h3><Link to='/'><img src={logo} alt='Central park osasco' /></Link></h3>
        <ul id="nav-links">
          {auth && (
            <li>
              <span>Olá {user.name}</span>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header