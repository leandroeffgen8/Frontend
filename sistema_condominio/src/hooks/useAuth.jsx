import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { user } = useSelector( state => state.auth );

    const [ auth, setAuth ] = useState(false)
    const [ loading, setLoagind ] = useState(true);


    useEffect( () => {
        if(user){
            setAuth(true)
        }else{
            setAuth(false)
        }
        setLoagind(false)

    },[user])

    return { auth, loading }

}