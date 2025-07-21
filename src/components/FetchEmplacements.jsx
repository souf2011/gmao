import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import axiosClent from '../Api/AxiosClent.js';

function FetchEmplacements({ formData, handleChange }) {
    const [emplacements, setEmplacements] = useState([]);

    const optionsEmplacement = emplacements.map(emp => ({
        value: emp.id,
        label: emp.name
    }));

    // --------------------fetch Data--------------------->
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClent.get('/emplacements');
                setEmplacements(response.data);
            } catch (err) {
                console.error('Erreur lors de la requête :', err);
            } 
        };

        fetchData();
    }, []);
    // --------------------end Data--------------------->


    return (
        <div className="form-item">
            <label htmlFor="Emplacement">Emplacement<span>*</span></label>

            <Select className='searchSelect'
                id="Emplacement"
                name="Emplacement"
                options={optionsEmplacement}
                value={optionsEmplacement.find(option => option.value === formData.Emplacement  || '')}
                onChange={(selectedOption) =>
                    handleChange({ target: { name: 'Emplacement', value: selectedOption.value } })
                }
                placeholder="Choisissez Emplacement"

            />
        </div>
    );
}

export default FetchEmplacements;

