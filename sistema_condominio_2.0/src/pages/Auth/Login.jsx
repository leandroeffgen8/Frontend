import './Auth.css';

import logo from '../../assets/logo.png';

import { useForm} from 'react-hook-form';
import { Link } from "react-router-dom";

//components
import Message from '../../components/Message/Message';
import Welcome from '../../components/Welcome/Welcome';

// hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { useSelector, useDispatch } from 'react-redux';

//redux
import { loginUser, reset } from '../../slices/authSlices';
import { useEffect } from 'react';

const Login = () => {
  
    const { register, handleSubmit } = useForm();

    const { loading, error, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect( () => {
      dispatch(reset());
    },[dispatch])

    useAutoResetMessage(error, message, reset)

    const onSubmit = (data) => {
        console.log(data)
        dispatch(loginUser(data));
    }

    return (
      <div className='container-home'>

        <Welcome />

        <div className="loginRegister">
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

          
        </div>

      </div>
    )
}

export default Login