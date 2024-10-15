import './App.css';

//Pages
import Home from './pages/Home/Home'; 
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';

//components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//hooks
import { useAuth } from './hooks/useAuth';

function App() { 

	const { auth, loading } = useAuth();

	if(loading){
		return <p>Carregando...</p>
	}

	return (
		<div className="App">
			<BrowserRouter>
			{auth && <Header />}
				<div className={`container ${!auth ? 'home-page' : ''}`}>
					<Routes>
						<Route path='*' element={auth ? <Home /> : <Navigate to='/login' />} >
							<Route path='profile' element={auth ? <Profile /> : <Navigate to='/login' />} />
						</Route>
						<Route path='/login' element={!auth ? <Login /> : <Navigate to='/' />} />
						<Route path='/register' element={!auth ? <Register /> : <Navigate to='/' />} /> 
						
					</Routes>
				</div>
			{auth && <Footer /> }
			</BrowserRouter>
		</div>
	)
}

export default App
