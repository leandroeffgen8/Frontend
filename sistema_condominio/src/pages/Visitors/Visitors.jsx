import './Visitors.css';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import Message from '../../components/Message/Message';

//hooks
import { createVisitors, resetMessage } from '../../slices/visitorsSlice';

//redux
import { useSelector, useDispatch } from 'react-redux';

const Visitors = () => {

	const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();

	const { loading, message, error } = useSelector(state => state.visitors)

	useEffect(() => {
		dispatch(resetMessage());
	},[dispatch]);

	useEffect( () => {
		if(message) {
			reset();
		}	
	},[message, reset])

	const onSubmit = (data) => {
		console.log(data)
		dispatch(createVisitors(data));
		setTimeout(() => {
            dispatch(resetMessage());
        }, 1500); 
	}

	return (
		<div className='content-grid formWidthFull visitors'>
		<h2>Agende um visitante</h2>
		<p>Aqui você pode registrar um visitante (familiar) ou um prestador de serviço.</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Nome</label>
				<input type="text" {...register('name')} placeholder='Insira o nome do visitante ou prestador de serviços' />
				<label>Escolha uma opção</label>
				<select {...register('visits')}>
					<option value="0">Selecione uma opção</option>
					<option value="familiar">Familiar</option>
					<option value="amigos">Amigos</option>
					<option value="prestador">Prestador de Serviço</option>
				</select>
				<label>Data</label>
				<input type="date" {...register('dateOfVisit')} />
				<label>Assunto</label>
				<textarea {...register('purpose')}></textarea>
				{!loading && <input type="submit" value="Reservar" />}
				{loading && <input type="submit" value="Aguarde..." disabled />}
				{error && <Message msg={error} type="error" />}
				{message && <Message msg={message} type="success" />}
			</form>
		</div>
	)
}

export default Visitors