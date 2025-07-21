import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import ConfirmationDelete from '../../../components/ConfirmationDelete';
import { Link, useParams } from 'react-router-dom';
import { FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import ExportElement from '../../../components/ExportElement';
import axiosClent from '../../../Api/AxiosClent.js';
import default_image_url from '../../../assets/images/default_image.png';
import { toast, ToastContainer } from 'react-toastify';

function DetailEquipement() {
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [equipements, setEquipements] = useState(null);
    const { id } = useParams();
    const [equipementDelete, setEquipementDelete] = useState(null);

    const handleDeleteClick = () => {
        setAfficheConfirme(true);
    };

    const confirmDelete = async () => {
        try {
            if (equipementDelete) {
                const response = await axiosClent.delete(`/equipements/${equipementDelete.id}`);
                if (response.status === 200) {
                    toast.success('Équipement supprimé avec succès');
                } else {
                    toast.error("Erreur lors de la suppression de l'équipement");
                }
            }
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            toast.error("Erreur lors de la suppression !");
        } finally {
            setAfficheConfirme(false);
        }
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
                const response = await axiosClent(`/equipements/${id}?with=emplacement`);
                const data = response.data;
                setEquipements(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                toast.error("Erreur lors de la récupération des données !");
            }
        };

        fetchData();
    }, [id]);

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
                        <ExportElement
                            data={equipements}
                            fileName="Detail de Equipement"
                            columns={["Equipement", "Categorie", "N_Serie", "Emplacement", "Compteur", "Modele_Equipement"]}
                        />
                    </div>
                </div>
                <div className="container_content">
                    <div className="container_profile">
                        <div className="equipementDtail">
                            <div className="equipementDtail_left">
                                <div className="equipement">
                                    <img
                                        src={
                                            equipements?.Image_Equipement
                                                ? `${import.meta.env.VITE_BACKEND_URL}/storage/Equipements/${equipements.Image_Equipement}`
                                                : default_image_url
                                        }
                                        alt={equipements?.Nom_Equipement || "Equipment image"}
                                        className="equipement-image"
                                        onError={(e) => {
                                            e.target.src = default_image_url;
                                            e.target.alt = "Default equipment image";
                                        }}
                                    />
                                    <div className='info'>
                                        <h2>{equipements?.Nom_Equipement}</h2>
                                        <p>{equipements?.Code_Equipement}</p>
                                    </div>
                                </div>

                                <div className='historique'>
                                    <Link>Historique d'intervention</Link>
                                    <Link>Historique location</Link>
                                    <Link>Historique d'intervenant</Link>
                                    <Link>Article</Link>
                                    <Link>Demande d'achat</Link>
                                </div>
                            </div>
                            <div className="equipementDtail_right">
                                <div className="equipementDtail_right_header">
                                    <div className="equipementDtail_right_header_top">
                                        <h2>Informations</h2>

                                        <div className="info">
                                            <p><strong>Nom de l'équipement :</strong> {equipements?.Nom_Equipement}</p>
                                            <p><strong>Numéro de série :</strong> {equipements?.N_Serie}</p>
                                            <p><strong>Emplacement :</strong> {equipements?.emplacement?.Nom_Emplacement}</p>
                                            <p><strong>Modèle de l'équipement :</strong> {equipements?.Modele_Equipement}</p>
                                            <p><strong>Compteur :</strong> {equipements?.Compteur}</p>
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
            <ToastContainer
                autoClose={1500}
            />
        </>
    );
}

export default DetailEquipement;
