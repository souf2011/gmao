
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import ConfirmationDelete from '../../../components/ConfirmationDelete';
import userImage from '../../../assets/images/user.png';
import { Link, useParams } from 'react-router-dom';
import { FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

function PlusDetails() {
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [equipements, setEquipements] = useState(null);
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




    const Retour = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/equipements/${id}`);
                const data = await response.json();
                setEquipements(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Détail  équipement </h1>
                        <p className='container_subtitle'>Cette section présente les informations d'équipement </p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                    </div>
                    <div className='container_header_left'>
                        {/* -------------- */}
                    </div>
                </div>
                <div className="container_content">
                    <div className="container_profile">
                        <div className="equipementDtail">
                            <div className="equipementDtail_left">
                                <div className="equipement">
                                    <img
                                        src={equipements && equipements.image ? `http://localhost:3000/uploads/${equipements.image}` : userImage}
                                        alt="equipement"
                                    />
                                    <div className='info'>
                                        <h2>{equipements && equipements.Equipement}</h2>
                                        <p>{equipements && equipements.Code_Equipement}</p>
                                    </div>
                                </div>

                                <div className='historique'>
                                    <Link>Historique d'intervetion</Link>
                                    <Link>Historique location</Link>
                                    <Link>Historique d'intervenent</Link>
                                    <Link>Article</Link>
                                    <Link>Demande d'achat</Link>
                                </div>
                            </div>
                            <div className="equipementDtail_right">
                                <div className="equipementDtail_right_header">
                                    <div className="equipementDtail_right_header_top">
                                        <h2>Informations</h2>

                                        <div className="info">
                                            <p><strong>Nom de l'équipement :</strong> {equipements && equipements.Equipement}</p>
                                            <p><strong>Numéro de série :</strong> {equipements && equipements.N_Serie}</p>
                                            <p><strong>Emplacement :</strong> {equipements && equipements.Emplacement}</p>
                                            <p><strong>Modèle de l'équipement :</strong> {equipements && equipements.Modele_Equipement}</p>
                                            <p><strong>Compteur :</strong> {equipements && equipements.Compteur}</p>
                                        </div>


                                    </div>
                                    <div className="equipementDtail_right_header_bottom">
                                        <Link to={`/admin/equipements/PlusDetails/${id}`} className='btn_more'><FaPenToSquare /> Plus Details</Link>
                                        <Link to={`/admin/equipements/ModifierEquipement/${id}`} className='btn_edit'><FaPenToSquare /> Modifier</Link>
                                        <button className='btn_delete' onClick={handleDeleteClick}><FaRegTrashAlt /> Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationDelete
                affiche={afficheConfirme}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />
        </>
    );
}

export default PlusDetails;
