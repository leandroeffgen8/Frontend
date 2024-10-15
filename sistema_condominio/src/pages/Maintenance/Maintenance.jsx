import './Maintenance.css'
import { useForm } from 'react-hook-form';
import Message from '../../components/Message/Message';

//hooks
import { createMaintenance, resetMessage } from '../../slices/maintenanceSlice';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Maintenance = () => {

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { loading, error, message } = useSelector(state => state.maintenance);

   useEffect(() => {
    if(message){
      reset();
    }
   },[message, reset]);

  const onSubmit = (data) => {
    dispatch(createMaintenance(data));
    setTimeout(() => {
      dispatch(resetMessage());
    },2000)
  }
  return (
    <div className='content-grid formWidthFull'>
		  <h2>Manutenção Interna</h2>
      <p>Preencha o formulário abaixo para registrar sua manutenção.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
          <label>Descrição</label>
          <input type="text" placeholder='Insira uma descrição' {...register('description')} />
          {!loading &&  <input type="submit" value="Registrar" />}
          {loading &&  <input type="submit" value="Aguarde..." disabled />}
          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
    </div>
  )
}

export default Maintenance