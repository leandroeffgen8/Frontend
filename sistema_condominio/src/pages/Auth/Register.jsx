import { useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import './Auth.css'

import logo from '../../assets/logo3.png'

//components
import Message from '../../components/Message/Message';
import Welcome from '../../components/Welcome/Welcome';

//Hooks
import { registerUser, reset } from '../../slices/authSlice';

//Redux
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {

  const { register, handleSubmit } = useForm();

  // Dispatch permite usar os register e reset do redux
  const dispatch = useDispatch();

  const { loading, error } = useSelector( state => state.auth);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(registerUser(data))
  }

  //reseta tudo
  useEffect(() => {
    dispatch(reset());
  },[dispatch])

  return (
		<div className='container-home'>

			<Welcome />

			<div className="login register">
				
				<h3 className='logo'><img src={logo} /></h3>
			
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid">
						<div>
							<label>Nome *</label>
							<input type="text" {...register('name')} placeholder='Insira o nome' />
						</div>
						<div>
							<label>E-mail *</label>
							<input type="email" {...register('email')} placeholder='Insira o e-mail' />
						</div>
						<div>
						<label>Senha *</label>
							<input type="password" {...register('password')} placeholder='Insira a senha' />
						</div>
						<div>
						<label>Confirme sua senha *</label>
							<input type="password" {...register('confirmpassword')} placeholder='Confirme a senha' />
						</div>
						<div>
							<label>Sua função *</label>
							<select {...register('role')}>
								<option value="0">Selecione uma função</option>
								<option value="admin">Admin</option>
								<option value="morador">Morador</option>
							</select>
						</div>
						<div>
							<label>Nº do apto *</label>
							<input type="text" {...register('apto')} placeholder='Insira o nº do apto' />
						</div>

						<div className='inputEntrar'>
							{!loading &&  <input type="submit" value="Cadastrar" />}
							{loading &&  <input type="submit" value="Aguarde..." disabled />}
							{error && <Message msg={error} type="error" />}
						</div>
					</div>
				</form>

				<p>Já tem conta? <Link to='/Login'>Clique aqui.</Link></p>
				
			</div>
		</div>
  	)
}

export default Register