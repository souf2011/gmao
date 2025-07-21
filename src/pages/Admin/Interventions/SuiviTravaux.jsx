import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import axios from 'axios';
import { FaPlus, FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import Pagination from '../../../components/Pagination';
import useFiltragePagination from '../../../hookes/PaginationFiltrage';
import { Link } from 'react-router-dom';
import ConfirmationDelete from '../../../components/ConfirmationDelete';
function SuiviTravaux() {
    const [formData, setFormData] = useState({
        dateSuivi: '',
        intervenant: '',
        tache: '',
        nbHeures: '',
        pourcentage: '',
    });

    const [suivis, setSuivis] = useState([]);
    const [afficheConfirme, setAfficheConfirme] = useState(false);

    const {
        currentPage,
        setCurrentPage,
        totalPages,
        lignesAffichees,
        maxRows
    } = useFiltragePagination(suivis, 4);


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
    const handleDeleteClick = () => {
        setAfficheConfirme(true);
    };
    const confirmDelete = () => {
        setAfficheConfirme(false);
    };
    const cancelDelete = () => {
        setAfficheConfirme(false);
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/suivi_travaux');
                console.log(response.data);
                setSuivis(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des suivis:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Header />
            <div className="container">
                <div className="container_header">
                    <div className="container_header_right">
                        <h1 className="container_title">Suivi de travaux</h1>
                        <p className="container_subtitle">Affiche Suivi de travaux d’une intervention</p>
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
                                        type="Date"
                                        name="dateSuivi"
                                        placeholder="JJ/MM/AAAA"
                                        value={formData.dateSuivi}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="intervenant"
                                        placeholder="INTERVENANT"
                                        value={formData.intervenant}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="tache"
                                        placeholder="TACHE"
                                        value={formData.tache}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="nbHeures"
                                        placeholder="NB HEURES"
                                        value={formData.nbHeures}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="pourcentage"
                                        placeholder="POURCENTAGE%"
                                        value={formData.pourcentage}
                                        onChange={handleChange}
                                        className="form_input"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form_buttons">
                        <button type="button" className="btn_ajouter">
                            <FaPlus /> Ajouter
                        </button>
                        <button type="submit" className="btn_enregistrer">
                            Enregistrer un suivi
                        </button>
                    </div>
                </form>
                {lignesAffichees.length > 0 ? (
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>DATE SUIVI</th>
                                <th>INTERVENANT</th>
                                <th>TACHE</th>
                                <th>NB HEURES</th>
                                <th>POURCENTAGE %</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {lignesAffichees.map(suivi => (
                                <tr key={suivi.id}>
                                    <td>{suivi.dateSuivi}</td>
                                    <td>{suivi.intervenant}</td>
                                    <td>{suivi.tache}</td>
                                    <td>{suivi.nbHeures}</td>
                                    <td>{suivi.pourcentage}</td>
                                    <td className="table_action">
                                        <div className="action-wrapper">
                                            <Link to={`/admin/interventions/ModifierSuiviTravaux/${suivi.id}`}>
                                                <span><FaPenToSquare /></span>
                                            </Link>
                                            <button onClick={() => handleDeleteClick(suivi)}>
                                                <span><FaRegTrashAlt /></span>
                                            </button>
                                            <span><PiDotsThreeOutlineVerticalLight /></span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun suivi disponible.</p>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={setCurrentPage}
                    maxRows={maxRows}
                    totalItems={suivis.length}
                />
                <ConfirmationDelete
                    affiche={afficheConfirme}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </div>
        </>
    );
}

export default SuiviTravaux;
