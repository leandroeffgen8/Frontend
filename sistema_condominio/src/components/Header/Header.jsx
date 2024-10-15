import './Header.css'
import { Link } from 'react-router-dom';

//import { BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

import logo from '../../../src/assets/logo3.png';

import { useEffect } from 'react';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';

//redux
import { profile } from '../../slices/userSlice';


const Header = () => {

  	const { auth } = useAuth();
	const { user: userName } = useSelector(state => state.user);


	const dispatch = useDispatch();

	useEffect( () => {
        dispatch(profile())
    },[dispatch])

	return (
		<header>
			<nav id='nav'>
				<h3 className='logo'><Link to='/'><img src={logo} alt="Logo" /></Link></h3>
					<ul id="nav-links">
						{auth ? (
							<>
								<li>
									<span>Olá, {userName.name}</span>
								</li>
								{/* <li>
									<span onClick={handleLogout}>Sair</span>
								</li> */}

								{/* <li>
									<NavLink to="/">
										<BsHouseDoorFill />
									</NavLink>
								</li>
								{user && (
									<li>
										<NavLink to={`/users/${user._id}`}>
											<BsFillCameraFill />
										</NavLink>
									</li>
								)}
								<li>
									<NavLink to="/profile">
										<BsFillPersonFill />
									</NavLink>
								</li> */}
								
							</>
						) : (
							<>
								{/* <li>
									<NavLink to="/login">
										Entrar
									</NavLink>
								</li>
								<li>
									<NavLink to="/register">
										Cadastrar
									</NavLink>
								</li> */}
							</>
						)}
						
					</ul>
			</nav>
		</header>
	)
}

export default Header