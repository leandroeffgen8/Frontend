import './Home.css'
import { Route, Routes } from 'react-router-dom';

//components
import Sidebar from '../../components/Sidebar/Sidebar';

//pages
import Default from '../Default/Default';
import Profile from '../Profile/Profile';
import FormSchedule from '../FormSchedule/FormSchedule';
import Reservations from '../Reservations/Reservations';
import MyReservations from '../Reservations/MyReservations';
import FormNotifications from '../Notifications/FormNotifications';
import Notifications from '../Notifications/Notifications';
import FormIncidents from '../FormIncidents/FormIncidents';
import Incidents from '../Incidents/Incidents';
import CalledByUser from '../CalledByUser/CalledByUser';
import Residents from '../Residents/Residents';
import FormAssembly from '../FormAssembly/FormAssembly';
import Assembly from '../Assembly/Assembly';
import Poll from '../FormPoll/Poll';
import ListPoll from '../Poll/ListPoll';

const Home = () => {
	return (
		<div className='main'>
			<div className="container-main">
				<Sidebar />
				<div className='content'>
					<Routes> 
						<Route path='/' element={<Default />} />
						<Route path="/profile" element={<Profile />} />
						<Route path='/form-schedule' element={<FormSchedule />} />
						<Route path='/reservations' element={<Reservations />} />
						<Route path='/my-reservations' element={<MyReservations />} />
						<Route path='/create-notification' element={<FormNotifications />} />
						<Route path='/notifications' element={<Notifications />} />
						<Route path='/form-incidents' element={<FormIncidents />} />
						<Route path='/incidents' element={<Incidents />} />
						<Route path='/my-called' element={<CalledByUser />} />
						<Route path='/residents' element={<Residents />} />
						<Route path='/create-assembly' element={<FormAssembly />} />
						<Route path='/assembly' element={<Assembly />} />
						<Route path='/create-poll' element={<Poll />} />
						<Route path='/poll' element={<ListPoll />} />
					</Routes> 
				</div>
			</div>
		</div>
	)
}

export default Home