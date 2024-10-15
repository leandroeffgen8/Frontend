import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Message from '../../../components/Message/Message';

//hooks
import { resetMessage, createAssembleia } from '../../../slices/assembleiaSlice';
//redux
import { useSelector, useDispatch } from 'react-redux';


const FormAssembleia = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const { loading, message, error } = useSelector(state => state.assembleia)

    useEffect(() => {
		dispatch(resetMessage());
	},[dispatch]);

    useEffect(() => {
        if(message){
            reset();
        }
    },[message, reset])

    const onSubmit = (data) => {
        console.log(data)
        dispatch(createAssembleia(data));
        setTimeout( () => {
            dispatch(resetMessage());
        },1500)
    }

    return (
        <div className='content-grid formWidthFull'>
            <h2>Assembleia</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Local</label>
                <input type="text" placeholder='Insira o local da assembleia' {...register('local')} />
                <div className="group">
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
                <textarea {...register('assunto')}></textarea>
                {!loading &&  <input type="submit" value="Cadastrar" />}
                {loading &&  <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default FormAssembleia