import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {
    const location = useLocation();
    const [messageShown, setMessageShown] = useState(false);

    useEffect(() => {
        if (location.state?.message && !messageShown) {
            toast.success(location.state.message);
            setMessageShown(true); 
        }
    }, [location.state, messageShown]);

    return <ToastContainer />;
};

export default ToastNotification;
