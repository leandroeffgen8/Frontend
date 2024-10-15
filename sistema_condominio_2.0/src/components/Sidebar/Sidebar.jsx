import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { BsCalendar3EventFill, BsList, BsPersonCircle, BsMegaphoneFill, BsEscape, BsCalendarDate, BsCalendarCheckFill, BsFileEarmarkTextFill, BsFolderCheck, BsGearFill, BsPencilSquare, BsTools, BsHouseFill } from 'react-icons/bs';

import { uploads } from '../../utils/config';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../../slices/authSlices';
import { profile } from '../../slices/userSlices';

const Sidebar = () => {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
	const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    useEffect( () => {
		dispatch(profile());
	},[dispatch]);

   
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
		dispatch(logoutUser())
		dispatch(reset());

		navigate('/login');
	}

    return (

        <>
            {/* Ícone do menu que aparece no mobile */}
            <div className="menu-icon" onClick={toggleSidebar}>
                <BsList size={30} />
            </div>
            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="userImg">
                    <div className="imgProfile">
                        {user.profileImage ? (
                            <img src={`${uploads}/${user.profileImage}`} alt={user.name} />
                        ):(
                            <div className='image-sem-foto'>
                                <h3>S/F</h3>
                            </div>
                        )}
                    </div>
                    <div className="dados">
                        <span>{user.name}</span>
                        <Link to="/profile">Meus dados</Link>
                    </div>
                </div>


                {user && user.role === 'morador' ? (
                    <>
                        <span className="barra-title">Navegação</span>
                        <ul className='list-itens'> 
                            <li><Link to='/'><BsHouseFill /> Home</Link></li>
                            <li><Link to='/reservations'><BsCalendarDate /> Reservas</Link></li>
                            <li><Link to='/notifications'><BsPencilSquare /> Notificações</Link></li>   
                            <li><Link to='/poll'><BsTools /> Enquente</Link></li>
                            <li><Link to='/assembly'><BsMegaphoneFill /> Assembleias</Link></li>       
                        </ul>

                        <span className="barra-title">Formulários</span> 
                        <ul className='list-itens'>
                            <li><Link to='/form-schedule'><BsCalendar3EventFill /> Agenda ambiente</Link></li>
                            <li><Link to='/form-incidents'><BsTools /> Registrar um Incidente</Link></li>
                        </ul>

                        <span className="barra-title">Minha Ações</span>
                        <ul className='list-itens'> 
                            <li><Link to='/my-reservations'><BsCalendarCheckFill /> Minhas reservas</Link></li>
                            <li><Link to='/my-called'><BsGearFill /> Meus Chamados</Link></li>
                        </ul>

                        <span className="barra-title">Deslogar-me</span>
                        <ul className='list-itens'> 
                            <li onClick={handleLogout}><BsEscape /> Logout</li> 
                        </ul>
                    </>

                    ) : (

                    <>
                        <span className="barra-title">Navegação</span>
                        <ul className='list-itens'> 
                            <li><Link to='/'><BsHouseFill /> Home</Link></li>
                            <li><Link to='/residents'><BsPersonCircle /> Moradores</Link></li>         
                            <li><Link to='/reservations'><BsCalendar3EventFill /> Eventos</Link></li>
                            <li><Link to='/incidents'><BsTools /> Incidentes</Link></li>
                            <li><Link to='/notifications'><BsPencilSquare /> Notificações</Link></li>
                            <li><Link to='/poll'><BsFileEarmarkTextFill /> Resultado da enquete</Link></li>
                            <li><Link to='/assembly'><BsMegaphoneFill /> Assembleias</Link></li>                          
                        </ul>

                        <span className="barra-title">Formulários</span> 
                        <ul className='list-itens'>                        
                            <li><Link to='/create-poll'><BsFolderCheck /> Criar uma enquete</Link></li>
                            <li><Link to='/create-notification'><BsFileEarmarkTextFill /> Criar uma notificação</Link></li>
                            <li><Link to='/create-assembly'><BsMegaphoneFill /> Agendar uma Assembleia</Link></li>
                        </ul>

                        <span className="barra-title">Deslogar-me</span>
                        <ul className='list-itens'> 
                            <li onClick={handleLogout}><BsEscape /> Logout</li> 
                        </ul>
                    </>
                )}
                    
            </div>
        </>
    )
}

export default Sidebar