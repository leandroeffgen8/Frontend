import { useForm} from 'react-hook-form';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

import './Auth.css'

import logo from '../../assets/logo3.png'

// components
import Share from '../../components/Share/Share';
import Message from '../../components/Message/Message';

// hooks
import { useSelector, useDispatch } from 'react-redux';

// redux
import { loginUser, reset } from '../../slices/authSlice';
import Welcome from '../../components/Welcome/Welcome';

const Login = () => {

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.auth);

  const onSubmit = (data) => {
    console.log(data)
    dispatch(loginUser(data));
  }

  //Limpa tudo
  useEffect( () => {
    dispatch(reset())
  },[dispatch]);

  return (
    <div className='container-home'>

		<Welcome />

		<div className="login">
			
			<h3 className='logo'><img src={logo} /></h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					
					<label>Usuário</label>
					<input type="email" {...register('email')} placeholder='Insira seu e-mail' />

					<label>Senha</label>
					<input type="password" {...register('password')} placeholder='Insira sua senha' />

					{!loading &&  <input type="submit" value="Logar" />}
					{loading &&  <input type="submit" value="Aguarde..." disabled />}
					{error && <Message msg={error} type="error" />}
				</form>

				<p>Ainda não tem conta? <Link to='/register'>Cadastra-se</Link></p>
			<Share />
			
		</div>


		{/* <Welcome />
		<div id="login">
			<div className="col-right">
				<h3 className='logo'><img src={logo} /></h3>
				<p className="subtitle">Faça o login para ver o que há de novo no condomínio.</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="fields">
						<i className="fa-user fa"></i>
						<input type="email" {...register('email')} placeholder='Insira seu e-mail' />
					</div>
				
					<div className="fields">
						<i className="fa-lock fa"></i>
						<input type="password" {...register('password')} placeholder='Insira sua senha' />
					</div>

					{!loading &&  <input type="submit" value="Entrar" />}
					{loading &&  <input type="submit" value="Aguarde..." disabled />}
					{error && <Message msg={error} type="error" />}
				</form>
				<Share />
			</div>
		</div> */}
	</div>
  )
}

export default Login