import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import axios from 'axios';
import { FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

import { useParams } from 'react-router-dom';

function ModifierSuiviTravaux() {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        dateSuivi: '',
        intervenant: '',
        tache: '',
        nbHeures: '',
        pourcentage: '',
    });

    const handleRetour = () => {
        window.history.back();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleModifier = async () => {
        try {
            await axios.put(`http://localhost:4000/suivi_travaux/${id}`, formData);
           
        } catch (error) {
            console.error('Erreur lors de la modification du suivi:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/suivi_travaux/${id}`);
                setFormData(response.data);
            
            } catch (error) {
                console.error('Erreur lors de la récupération du suivi:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Header />
            <div className="container">
                <div className="container_header">
                    <div className="container_header_right">
                        <h1 className="container_title">Modifier Suivi de travaux</h1>
                        <p className="container_subtitle">Modifier les informations d’un suivi des travaux</p>
                        <span className="retour" onClick={handleRetour}>
                            <FaChevronLeft /> retour
                        </span>
                    </div>
                </div>

                <form className="form_suivi" autoComplete="off" onSubmit={e => e.preventDefault()}>
                    <table className="form_table">
                        <thead>
                            <tr>
                                <th>DATE SUIVI</th>
                                <th>INTERVENANT</th>
                                <th>TACHE</th>
                                <th>NB HEURES</th>
                                <th>POURCENTAGE %</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="date"
                                        name="dateSuivi"
                                        value={formData.dateSuivi}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="intervenant"
                                        value={formData.intervenant}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="tache"
                                        value={formData.tache}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="nbHeures"
                                        value={formData.nbHeures}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="pourcentage"
                                        value={formData.pourcentage}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form_buttons">
                        <button type="button" onClick={handleModifier} className="btn_enregistrer">
                            <FaPenToSquare /> Modifier
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ModifierSuiviTravaux;
