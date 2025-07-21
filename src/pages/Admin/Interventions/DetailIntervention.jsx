import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import ConfirmationDelete from '../../../components/ConfirmationDelete';

import { FaChevronLeft, FaRegTrashAlt, FaRegCalendarAlt, FaRegCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { MdFormatListBulleted } from "react-icons/md";
import { FiUsers, FiUser } from "react-icons/fi";
import { BsHourglassSplit, BsTools } from "react-icons/bs";
import { RiProgress3Line } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";;

function DetailIntervention() {
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [intervention, setIntervention] = useState(null);
    const { id } = useParams();

    const handleDeleteClick = () => {
        setAfficheConfirme(true);
    };

    const confirmDelete = () => {
        setAfficheConfirme(false);
    };

    const cancelDelete = () => {
        setAfficheConfirme(false);
    };

    const handleRetour = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseIntervention = await fetch(`http://localhost:4000/interventions/${id}`);
                const dataIntervention = await responseIntervention.json();

                console.log(dataIntervention);

                if (!Array.isArray(dataIntervention.suivis)) {
                    dataIntervention.suivis = [];
                }
                setIntervention(dataIntervention);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };


        fetchData();
    }, [id]);

    if (!intervention) return <div>Chargement...</div>;

    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Détail d'une Intervention</h1>
                        <p className='container_subtitle'>Affiche détail d'une intervention</p>
                        <span className="retour" onClick={handleRetour}><FaChevronLeft /> Retour</span>
                    </div>
                    <div className="container_header_left">
                        <Link to="/admin/interventions/demandeapprovisionnement" className="btn_link">
                            <span><MdFormatListBulleted /></span> D.A</Link>
                        <Link to="/admin/interventions/suiviTravaux" className="btn_link">
                            <span><MdFormatListBulleted /></span> Suivi des Travaux
                        </Link>

                    </div>
                </div>
                <div className="container_content">
                    <div className="container_intervention">
                       
                        <div className="intervention_left">
                            <div className="intervention_header">
                                <h2> {intervention.equipement}</h2>
                            </div>

                            <div className="info_block">
                                <h4><FiUsers /> Responsable</h4>
                                <p><strong>{intervention.responsable}</strong></p>
                            </div>

                            <div className="info_block">
                                <h4><FaPenToSquare /> Description</h4>
                                <p><strong>{intervention.description}</strong></p>
                            </div>
                            <div className="intervention_actions">
                                <Link to={`/admin/interventions/ModifierIntervention/${intervention.id}`} className="btn_edit">
                                    <FaPenToSquare /> Modifier
                                </Link>
                                <button className="btn_delete" onClick={() => handleDeleteClick(intervention.id)}>
                                    <FaRegTrashAlt /> Supprimer
                                </button>
                            </div>

                        </div>

                        
                        <div className="intervention_right">
                            <div className="details_grid">
                                <div className="detail_item">
                                    <h4><FaRegCalendarAlt /> Date</h4>
                                    <p>{intervention.date || "Date non fournie"}</p>
                                </div>
                                <div className="detail_item">
                                    <h4><FaMapMarkerAlt /> Emplacement</h4>
                                    <p>{intervention.emplacement}</p>
                                </div>
                                <div className="detail_item">
                                    <h4><FiUser /> Demandeur</h4>
                                    <p>{intervention.demandeur}</p>
                                </div>
                                <div className="detail_item">
                                    <h4><RiProgress3Line /> Statut</h4>
                                    <p>{intervention.statut}</p>
                                </div>
                                <div className="detail_item">
                                    <h4><BsHourglassSplit /> Priorité</h4>
                                    <p>{intervention.priorite}</p>
                                </div>
                                <div className="detail_item">
                                    <h4><FaRegCheckCircle /> État</h4>
                                    <p>{intervention.etat}</p>
                                </div>
                                <div className="detail_item">
                                    <h4><BsTools /> Type</h4>
                                    <p>{intervention.type || "Type non défini"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suivi de travaux section */}
                <div>

                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th colSpan="6">
                                    <p className="table-header-suivi">Suivi des Travaux</p>
                                </th>
                            </tr>
                            <tr>
                                <th>DATE SUIVI</th>
                                <th>INTERVENANT</th>
                                <th>TACHE</th>
                                <th>NOMBRE D'HEURES</th>
                                <th>POURCENTAGE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {intervention.suivis && intervention.suivis.length > 0 ? (
                                intervention.suivis.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.dateSuivi}</td>
                                        <td>{item.intervenant}</td>
                                        <td>{item.tache}</td>
                                        <td>{item.nbHeures}</td>
                                        <td>{item.pourcentage}</td>
                                        <td className="table_action">
                                            <div className="action-wrapper">
                                                <Link to={`/admin/interventions/ModifierSuiviTravaux/${item.id}`}>
                                                    <span><FaPenToSquare /></span>
                                                </Link>
                                                <button onClick={() => handleDeleteClick(item)}>
                                                    <span><FaRegTrashAlt /></span>
                                                </button>
                                                <Link to={`/admin/interventions/${item.id}`}>
                                                    <span><PiDotsThreeOutlineVerticalLight /></span>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>Aucun suivi de travaux disponible.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                <ConfirmationDelete
                    affiche={afficheConfirme}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </div>
        </>
    );
}

export default DetailIntervention;
