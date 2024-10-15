import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAutoResetMessage = (message, error, resetAction) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                dispatch(resetAction());
            }, 2000); 

            return () => clearTimeout(timer); // Limpa o timeout quando o componente desmonta ou as dependências mudam
        }
    }, [message, error, dispatch, resetAction]);
};

export default useAutoResetMessage;
