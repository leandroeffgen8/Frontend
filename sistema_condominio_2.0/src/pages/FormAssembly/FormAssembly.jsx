import './FormAssembly.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

//components
import Message from '../../components/Message/Message';

//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { resetMessage, createAssembly } from '../../slices/assemblySlices';

//redux
import { useSelector, useDispatch } from 'react-redux';

const FormAssembly = () => {

	const { register, handleSubmit, reset } = useForm();
	const { loading, message, error } = useSelector(state => state.assembly)
	const dispatch = useDispatch();

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
		dispatch(createAssembly(data));
    }

	return (
		<div className='content-grid container-form'>
            <h2>Assembleia</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Local</label>
                <input type="text" placeholder='Insira o local da assembleia' {...register('local')} />
                <div className="grid-line two">
                    <div>
                        <label>Data</label>
                        <input type="date" {...register('dayOf')} />
                    </div>
                    <div>
                        <label>Hora</label>
                        <input type="time" {...register('startTime')} />
                    </div>
                </div>
                <label>Assunto</label>
                <textarea {...register('subject')}></textarea>
                {!loading &&  <input type="submit" value="Cadastrar" />}
                {loading &&  <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
	)
}

export default FormAssembly