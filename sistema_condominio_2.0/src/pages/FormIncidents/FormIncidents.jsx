import './FormIncidents.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

//components
import Message from '../../components/Message/Message';

//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { resetMessage, createIncident } from '../../slices/incidentsSlices';

//redux
import { useSelector, useDispatch } from 'react-redux';

const FormIncidents = () => {

    const { register, handleSubmit, reset } = useForm();
    const { loading, message, error } = useSelector(state => state.incident)
    const dispatch = useDispatch();

    useEffect(() => {
		dispatch(resetMessage());
	},[dispatch]);

    useEffect(() => {
        if(message){
            reset()
        }
    },[message, reset])

    useAutoResetMessage(message, error, resetMessage);

    const onSubmit = (data) => {
        console.log(data)
        dispatch(createIncident(data));
    }

    return (
        <div className='content-grid container-form'>
            <h2>Registre um Incidente</h2>
            <p>Preencha o formulário abaixo para registrar um incidente.</p>
            
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

export default FormIncidents