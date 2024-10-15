import './ListPoll.css'

//components
import Message from '../../components/Message/Message';

//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { getPolls, votePoll, getResultsPoll, resetMessage } from '../../slices/pollSlices'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

const ListPoll = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { polls, pollResults, error, message, loading } = useSelector(state => state.poll)
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedPoll, setSelectedPoll] = useState(null); 
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        dispatch(getPolls())
        dispatch(resetMessage());
    },[dispatch])

    useAutoResetMessage(message, error, resetMessage)

    const handleVote = (pollId) => {
        if (!selectedOption || !selectedPoll) {
            alert('Por favor, selecione uma opção para votar.');
            return;
        }
        dispatch(votePoll({ id: pollId, optionID: selectedOption }));
    };

    const handleOptionChange = (pollId, optionId) => {
        setSelectedPoll(pollId);
        setSelectedOption(optionId);
    };

    const handleViewResults = (pollId) => {
        dispatch(getResultsPoll(pollId));
        setShowResults(true);
        setTimeout(() => {
            setShowResults(false); 
        }, 3000);
    };
   
    const isExpired = (expiresAt) => {
        const currentDate = new Date();
        const expirationDate = new Date(expiresAt);
        return expirationDate < currentDate;
    };

    const availablePolls = polls?.filter(poll => !isExpired(poll.expiresAt));
    

    return (
        <div className='container-full container-form'>
            {loading && <p>Carregando enquetes...</p>}
            {availablePolls && availablePolls.length > 0 ? (
                availablePolls.map((poll) => (
                    <div key={poll._id} className={`poll ${user && user.role === 'morador' ? 'morador' : 'admin' }`}>
                        <h2>{poll.principal}</h2>
                        <p>{poll.description}</p>
                        {user && user.role === 'morador' && (
                            <div className='grid-poll'>
                            <h3>{poll.title}</h3>
                            <ul>
                                {poll.options.map((option) => (
                                    <li key={option._id} className={selectedOption === option._id ? 'active' : ''}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`poll-${poll._id}`}
                                                value={option._id}
                                                onChange={() => handleOptionChange(poll._id, option._id)}
                                            />
                                            {option.optionText}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            </div>
                        )}
                       
                        <div className="btns">
                            {user && user.role === 'morador' && ( <button className='btn-back' onClick={() => handleVote(poll._id)}>Votar</button> )}
                            <button className='btn-result' onClick={() => handleViewResults(poll._id)}>Ver Resultados</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className='empty'>Nenhuma enquete disponível.</p>
            )}

            {pollResults && showResults && (
                <div className="poll-results">
                    <h3>Resultados da Enquete</h3>
                    <ul>
                        {pollResults.options.map((option) => {
                            const totalVotes = pollResults.options.reduce((acc, opt) => acc + opt.votes, 0);
                            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                            
                            return (
                                <li key={option._id}>
                                    <div className="option">
                                        <span>{option.optionText}</span>
                                        <span className="votes">{option.votes} votos</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className={`fill fill-${percentage}`} style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {message && <Message msg={message} type="success" />}
            {error && <Message msg={error} type="error" />}
        </div>
    )
}

export default ListPoll