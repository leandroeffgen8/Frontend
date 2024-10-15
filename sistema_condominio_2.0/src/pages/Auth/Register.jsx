import './Auth.css';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import logo from '../../assets/logo.png'

//component
import Welcome from '../../components/Welcome/Welcome';
import Message from '../../components/Message/Message';

//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { useSelector, useDispatch } from 'react-redux'; 

//redux
import { registerUser, reset } from  '../../slices/authSlices';
import { useEffect } from 'react';

const Register = () => {

	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const { loading, error, message } = useSelector(state => state.auth);

	const onSubmit = (data) => {
		console.log(data)
		dispatch(registerUser(data))
	}

	useAutoResetMessage(error, message, reset)

	useEffect( () => {
		dispatch(reset());
	},[dispatch]) 

	return (
		<div className='container-home'>

			<Welcome />
		
			<div className="loginRegister">

				<h3 className='logo'><img src={logo} /></h3>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid-form">
						<div>
							<label>Nome</label>
							<input type="text" {...register('name')} placeholder='Insira o nome' />
						</div>
						<div>
							<label>E-mail</label>
							<input type="text" {...register('email')} placeholder='Insira o e-mail' />
						</div>
						<div>
							<label>Senha</label>
							<input type="password" {...register('password')} placeholder='Insira a senha' />
						</div>
						<div>
							<label>Confirme sua senha</label>
							<input type="password" {...register('confirmpassword')} placeholder='Confirme sua senha' />
						</div>
						<div className='select'>
							<label>Sua função</label>
							<select {...register('role')}>
							<option value="0">Selecione uma função</option>
							<option value="admin">Admin</option>
							<option value="morador">Morador</option>
							</select>
						</div>
						<div>
							<label>Nº do apto</label>
							<input type="text" {...register('apto')} placeholder='Insira o nº do apto' />
						</div>
						<div className='contains-buttons'>
							{!loading && <input type="submit" value="Cadastrar" />}
							{loading && <input type="submit" value="Aguarde..." disabled />}
							{error && <Message msg={error} type="error" />}
						</div>
					</div>
				</form>
				<p>Já tem conta? <Link to="/login">clique aqui</Link></p>
			</div>
			
		</div>
	)
}

export default Register