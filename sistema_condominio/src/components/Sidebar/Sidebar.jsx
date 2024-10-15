import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { BsCalendar3EventFill, BsPersonCircle, BsMegaphoneFill, BsEscape, BsCalendarDate, BsCalendarCheckFill, BsFileEarmarkTextFill, BsPatchQuestionFill, BsFolderCheck, BsGearFill, BsPersonPlusFill, BsPencilSquare, BsTools, BsHouseFill } from 'react-icons/bs';

import { uploads } from '../../utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../slices/authSlice';

import { profile } from '../../slices/userSlice';

const Sidebar = () => {

    const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect( () => {
		dispatch(profile());
	},[dispatch]);

    const handleLogout = () => {
		dispatch(logout())
		dispatch(reset());

		navigate('/login');
	}
    
    return(
        <div className="sidebar">
            <div className="userImg">
                <div className="imgProfile">
                    <img src={`${uploads}/${user.profileImage}`} />
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
                        <li><Link to='/incident'><BsTools /> Ocorrências</Link></li> 
                        <li><Link to='/notificaticoes'><BsPencilSquare /> Notificações</Link></li>   
                        <li><Link to='/assembly'><BsMegaphoneFill /> Assembleias</Link></li>
                        <li><BsFolderCheck /> Documentos</li>
                        <li><BsPatchQuestionFill /> Faq</li>
                    </ul>

                    <span className="barra-title">Formulários</span> 
                    <ul className='list-itens'>
                        <li><Link to='/schedule'><BsCalendar3EventFill /> Agenda ambiente</Link></li>
                        <li><Link to='/visitors'><BsPersonPlusFill /> Agenda visitante</Link></li>
                        <li><Link to='/maintenance'><BsTools /> Manutenção Interna</Link></li>   
                    </ul>

                    <span className="barra-title">Minha Ações</span>
                    <ul className='list-itens'> 
                        <li><Link to='/my-reservations'><BsCalendarCheckFill /> Minhas reservas</Link></li>
                        <li className='sadsad'><Link to='/my-called'><BsGearFill /> Meus Chamados</Link></li>
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
                        <li><Link to='/admin-moradores'><BsPersonCircle /> Moradores</Link></li>         
                        <li><Link to='/reservations'><BsCalendar3EventFill /> Eventos</Link></li>
                        <li><Link to='/admin-ocorrencias'><BsTools /> Ocorrências</Link></li>
                        <li><Link to='/notificaticoes'><BsPencilSquare /> Notificações</Link></li>
                        <li><Link to='/admin-visitantes'><BsPersonPlusFill /> Visitantes</Link></li>
                        <li><Link to='/admin-manutencao'><BsPersonPlusFill /> Manutenção Interna</Link></li> 
                        <li><Link to='/assembly'><BsMegaphoneFill /> Assembleias</Link></li>                          
                    </ul>

                    <span className="barra-title">Formulários</span> 
                    <ul className='list-itens'>                        
                        <li><Link to='/admin-form-notificacoes'><BsFileEarmarkTextFill /> Criar uma notificação</Link></li>
                        <li><Link to='/admin-form-assembleia'><BsMegaphoneFill /> Agendar uma Assembleia</Link></li>
                    </ul>

                    <span className="barra-title">Deslogar-me</span>
                    <ul className='list-itens'> 
                        <li onClick={handleLogout}><BsEscape /> Logout</li> 
                    </ul>
                </>
            )}
            
        </div>
    )
}

export default Sidebar;