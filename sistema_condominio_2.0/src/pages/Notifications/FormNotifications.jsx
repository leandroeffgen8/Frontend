import './Notifications.css';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

//components
import Message from '../../components/Message/Message';

//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { resetMessage, createNotification } from '../../slices/notificationSlices';

//redux
import { useSelector, useDispatch } from 'react-redux';

const FormNotifications = () => {

    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.notification);

    useEffect(() => {
		dispatch(resetMessage());
	},[dispatch]);

    useEffect(() => {
        if(message){
            reset()
        }
    },[message, reset])

    useAutoResetMessage(message, error, resetMessage)

    const onSubmit = (data) => {
        console.log(data)
        dispatch(createNotification(data));
        setTimeout( () => {
            dispatch(resetMessage());
        },2000);
    }
   
    return (
        <div className='content-grid container-form'>
            <h2>Notificações</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Título</label>
                <input type="text" placeholder='Insira um título' {...register('title')} />
                <label>Mensagem</label>
                <textarea {...register('message')}></textarea>
                {!loading &&  <input type="submit" value="Cadastrar" />}
				{loading &&  <input type="submit" value="Aguarde..." disabled />}
				{error && <Message msg={error} type="error" />}
				{message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default FormNotifications
