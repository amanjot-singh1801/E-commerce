import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) {
            
            navigate('/error');
        }
    }, [token, navigate]);

    return token ? children : null;
}

export default PrivateRoute
