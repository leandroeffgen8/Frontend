import './FormSchedule.css';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

//components
import Message from '../../components/Message/Message';

//hooks
import { createReserve, resetMessage } from '../../slices/reserveSlices';

//redux
import { useSelector, useDispatch } from 'react-redux';

const FormSchedule = () => {

    const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();

    const { loading, message, error } = useSelector(state => state.reserve);

    useEffect(() => {
		dispatch(resetMessage());
	},[dispatch]);

    useEffect(() => {
        if(message){
            reset()
        }
    },[message, reset])

    const onSubmit =  (data) => {
        console.log(data);
        dispatch(createReserve(data));
        setTimeout( () => {
            dispatch(resetMessage());
        },2000); 
	}

    return (
        <div className='content-grid container-form'>
            <h2>Preencha o formulário para garantir sua reserva</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Qual área deseja reservar?</label>
                    <select {...register('area')}>
                        <option value="0">Selecione uma opção</option>
                        <option value="Salao de Festa">Salão de Festa</option>
                        <option value="Salao de Jogos">Salão de Jogos</option>
                        <option value="Espaco Kids">Espaço Kids</option>
                        <option value="Quadra Esportiva">Quadra Esportiva</option>
                        <option value="Churrasqueira">Churrasqueira</option>
                    </select>
                    <div className="grid-line">
                        <div>
                            <label>Escolha uma data:</label>
                            <input type="date" {...register('date')} />
                        </div>
                        <div>
                            <label>Hora início:	</label>
                            <input type="time" {...register('startTime')} />
                        </div>
                        <div>
                            <label>Hora fim:</label>
                            <input type="time" {...register('endTime')} />
                        </div>
                    </div>
                    {!loading &&  <input type="submit" value="Reservar" />}
                    {loading &&  <input type="submit" value="Aguarde..." disabled />}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </form>
        </div>
    )
}

export default FormSchedule