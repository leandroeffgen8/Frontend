import './Poll.css';
import { BsTrash, BsPatchPlus } from 'react-icons/bs'

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

//components
import Message from '../../components/Message/Message';

//hooks
import { resetMessage, createPoll } from '../../slices/pollSlices';

//redux
import { useDispatch, useSelector } from 'react-redux';

const PollForm = () => {   
    
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            title: '',
            options: [{ optionText: '' }], 
            expiresAt: ''
        }
    });
    
    const { loading, message, error } = useSelector(state => state.poll);
    const dispatch = useDispatch();
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options' 
    });
   
    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch]);

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            options: data.options.map(option => option.optionText)
        };

        console.log('Dados formatados para enviar:', formattedData);
        console.log('DATA', data);

        dispatch(createPoll(formattedData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    return (
        <div className='content-grid container-form'>
            <h2>Criar enquente</h2>

            <div className="enquete">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Título Principal:</label>
                    <input {...register('principal')} placeholder='Insira um título principal' />
                    <label>Título da Enquete:</label>
                    <input {...register('title')} placeholder='Insira um título' />
                    <label>Descrição:</label>
                    <input {...register('description')} placeholder='Insira alguma coisa...' />
                    <label>Opções:</label>
                    <div className='group'>
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <input {...register(`options.${index}.optionText`)} placeholder={`Opção ${index + 1}`} />
                                <div className='btn-excluir' onClick={() => remove(index)}><BsTrash /></div>
                            </div>
                        ))}
                        <span className='btn-add' onClick={() => append({ optionText: '' })}><BsPatchPlus /></span>
                    </div>
            
                    <label>Expira em:</label>
                    <input type="date" {...register('expiresAt')} />

                    {!loading &&  <input type="submit" value="Criar Enquete" />}
                    {loading &&  <input type="submit" value="Aguarde..." disabled />}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </form>
            </div>

        </div>
    );
};

export default PollForm;
