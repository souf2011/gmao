import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function Sucess() {
    const [affiche, setAffiche] = useState(true);

    const closeAlert = () => {
        setAffiche(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setAffiche(false);
            clearInterval(interval);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {affiche && (
                <div className="alerts">
                    <div className="alert success">
                        <span className="alert-icon sucess"><FaCheck /></span>
                        <div className="alert-content sucess">
                            <button className="alert-close" onClick={closeAlert}><MdClose /></button>
                            <div className='alert_content_titles'>
                                <div className="alert-title sucess">Success</div>
                                <div className="alert-subtitle">View details</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sucess;
