import React, { useState, useEffect } from 'react';

function TimeAndDate() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    //------------------ Format date as DD/MM/YYYY------------------>

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // ------------------ Time format options------->

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    //------------------ Day format options------------------>
    const dayOptions = {
        weekday: 'long'
    };

    return (
        <>
          {formatDate(currentTime)} - {currentTime.toLocaleTimeString(undefined, timeOptions)} 
        </>
    );
}

export default TimeAndDate;