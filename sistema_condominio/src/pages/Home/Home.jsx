import './Home.css'
import { Route, Routes } from 'react-router-dom';

//components
import Sidebar from '../../components/Sidebar/Sidebar';

//pages
import EditProfile from '../EditProfile/EditProfile';
import Default from '../Default/Default';
import Schedule from '../Schedule/Schedule';
import Reservations from '../Reservations/Reservations'; 
import MyReservations from '../MyReservations/MyReservations';
import Visitors from '../Visitors/Visitors';
import MyCalled from '../MyCalled/MyCalled';
import Incident from '../Incident/Incident';	
import Ocorrencias from '../Admin/Ocorrencias/Ocorrencias'	
import FormNotificacoes from '../Admin/Notificacoes/FormNotificacoes';
import ListNotificacoes from '../Admin/Notificacoes/ListNotificacoes';
import Visitantes from '../Admin/Visitantes/Visitantes';
import FormAssembleia from '../Admin/Assembleia/FormAssembleia';
import Assembly from '../Assembly/Assembly';
import Maintenance from '../Maintenance/Maintenance';
import ListMaintenance from '../Admin/Maintenance/ListMaintenance'
import Moradores from '../Admin/Moradores/Moradores';
import Advertencia from '../Admin/Advertencia/Advertencia';

const Home = () => {
	return (
		<div className='main'>
			<div className="container-main">
				<Sidebar />
				<div className='content'>
					<Routes> 
						<Route path="/" element={<Default />} />
						<Route path="/profile" element={<EditProfile />} />
						<Route path="/schedule" element={<Schedule />} /> 
						<Route path="/reservations" element={<Reservations />} />
						<Route path="/my-reservations" element={<MyReservations />} /> 
						<Route path='/visitors' element={<Visitors />} />
						<Route path='/my-called' element={<MyCalled />} />
						<Route path='/incident' element={<Incident />} /> 
						<Route path='/admin-ocorrencias' element={<Ocorrencias />} />
						<Route path='/admin-form-notificacoes' element={<FormNotificacoes />} />
						<Route path='/notificaticoes' element={<ListNotificacoes />} />
						<Route path='/admin-visitantes' element={<Visitantes />} />
						<Route path='/admin-form-assembleia' element={<FormAssembleia />} />
						<Route path='/assembly' element={<Assembly />} />
						<Route path='/maintenance' element={<Maintenance />} />
						<Route path='/admin-manutencao' element={<ListMaintenance />} />
						<Route path='/admin-moradores' element={<Moradores />} />
						<Route path='/admin-advertencia' element={<Advertencia />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default Home