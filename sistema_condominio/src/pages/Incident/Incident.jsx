import './Incident.css';
import { useForm } from 'react-hook-form';
import Message from '../../components/Message/Message';

//hooks
import { resetMessage, registerIncident } from '../../slices/IncidentSlice';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Occurrences = () => {

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(state => state.incident)


  useEffect(() => {
		dispatch(resetMessage());
	},[dispatch]);

  useEffect(() => {
    if(message){
      reset()
    }
  },[message, reset])

  const onSubmit = (data) => {
    console.log(data)
    dispatch(registerIncident(data));
    setTimeout( () => {
      dispatch(resetMessage());
    },1500)
  }

  return (
    <div className='content-grid formWidthFull'>
		<h2>Registre uma Ocorrência</h2>
		<p>Preencha o formulário abaixo para registrar sua ocorrência.</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Título</label>
        <input type="text" placeholder='Insira um título' {...register('title')} />
        <label>Descrição</label>
				<textarea {...register('description')} placeholder='Insira a descrição aqui...'></textarea>
        {!loading &&  <input type="submit" value="Registrar" />}
				{loading &&  <input type="submit" value="Aguarde..." disabled />}
				{error && <Message msg={error} type="error" />}
				{message && <Message msg={message} type="success" />}
			</form>
		</div>
  )
}

export default Occurrences