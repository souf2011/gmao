import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import ConfirmationDelete from '../../../components/ConfirmationDelete';
import userImage from '../../../assets/images/avatar.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import axiosClent from '../../../Api/AxiosClent.js';
import { toast } from 'react-toastify';

function ProfileIntervenant() {
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [intervenant, setIntervenant] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setAfficheConfirme(true);
    };

    // Confirmation de la suppression
    const confirmDelete = async () => {
        try {
            await axiosClent.delete(`intervenants/${id}`);
            setAfficheConfirme(false);
            toast.success('Intervenant supprimé avec succès');
            navigate('/admin/intervenants', {
                state: { message: "Intervenant supprimé avec succès" }
            });
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            toast.error("Erreur lors de la suppression !");
        }
    };

    const cancelDelete = () => {
        setAfficheConfirme(false);
    };

    const Retour = () => {
        window.history.back();
    };

    // Récupération des données de l'intervenant
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClent.get(`/intervenants/${id}`);
                setIntervenant(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Liste des intervenants</h1>
                        <p className='container_subtitle'>Gestion des profils des intervenants actifs</p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                    </div>
                    <div className='container_header_left'>
                        {/* -------------- */}
                    </div>
                </div>
                <div className="container_content">
                    <div className="container_profile">
                        {intervenant && (
                            <div className="section_profil">
                                <div className="section_profil_left">
                                    <img
                                        src={intervenant.Image ? `${import.meta.env.VITE_BACKEND_URL}/storage/${intervenant.Image}` : userImage}
                                        alt="intervenant"
                                    />
                                    <div className='info'>
                                        <h2>{intervenant.Nom_intervenant}</h2>
                                        <p>{intervenant.Poste}</p>
                                    </div>
                                    <div className="profile_actions">
                                        <Link to={`/admin/intervenants/Modifierintervenant/${intervenant.id}`}>
                                            <button className="btn_edit"><span><FaPenToSquare /></span>Modifier</button>
                                        </Link>
                                        <button className="btn_delete" onClick={handleDeleteClick}>
                                            <span><FaRegTrashAlt /></span> Supprimer
                                        </button>
                                    </div>
                                </div>
                                <div className="section_profil_right">
                                    <p><span>Genre :</span> {intervenant.Genre}</p>
                                    <p><span>Date de naissance :</span> {intervenant.Date_Naissance}</p>
                                    <p><span>Email :</span> {intervenant.Email}</p>
                                    <p><span>Téléphone :</span> {intervenant.Telephone}</p>
                                    <p><span>Poste :</span> {intervenant.Poste}</p>
                                    <p><span>Date d'embauche :</span> {intervenant.DateEmbauche}</p>
                                    <p><span>Service :</span> {intervenant.Service}</p>
                                    <p><span>Fichier :</span> <Link to="#">{intervenant.Fichier}</Link></p>
                                </div>
                            </div>
                        )}
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

export default ProfileIntervenant;
