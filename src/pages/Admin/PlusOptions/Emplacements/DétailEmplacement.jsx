import React, { useEffect, useState } from 'react';
import Header from '../../../../components/Header';
import ConfirmationDelete from '../../../../components/ConfirmationDelete';
import { FaRegTrashAlt, FaChevronLeft, FaList } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosClent from '../../../../Api/AxiosClent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ToastNotification from '../../../../components/ToastNotification ';


function DétailEmplacement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [emplacement, setEmplacement] = useState(null);
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [emplacementToDelete, setEmplacementToDelete] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClent.get(`/emplacements/${id}`);
                setEmplacement(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la requête :', err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleRetour = () => window.history.back();

    const handleDeleteClick = (emplacement) => {
        setEmplacementToDelete(emplacement);
        setAfficheConfirme(true);
    };

    const confirmDelete = async () => {
        if (!emplacementToDelete) return;
        try {
            await axiosClent.delete(`/emplacements/${emplacementToDelete.id}`);
            setAfficheConfirme(false);
            toast.success('Emplacement supprimé avec succès');
            navigate('/admin/PlusOptions/emplacements/', {
                state: { message: "Emplacement supprimé avec succès" }
            });
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            toast.error("Erreur lors de la suppression !");
        }
    };

    const cancelDelete = () => setAfficheConfirme(false);

    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Détail d'un Emplacement</h1>
                        <p className='container_subtitle'>Cette section présente les détails de l'emplacement</p>
                        <span className="retour" onClick={handleRetour}><FaChevronLeft /> retour</span>
                    </div>
                    <div className='container_header_left_cat'>
                            <Link to="/admin/PlusOptions/emplacements/" className='btn_link_cat'>
                                <span><FaList /></span> Liste des Emplacements
                            </Link>
                        </div>
                </div>

                <div className="container_content">
                    <div className="container_Détail_cat">
                        
                        <div className="section_Détail">
                            {loading ? (
                                <p>Chargement des détails de l'emplacement...</p>
                            ) : emplacement ? (
                                <>
                                    <div className="section_Détail_left">
                                        <div className='info'>
                                            <h2>{emplacement.nom_emplacement}</h2>
                                            <p>{emplacement.address}</p>
                                        </div>
                                        <div className="Détail_actions">
                                            <Link
                                                to={`/admin/PlusOptions/emplacements/Modifier/${emplacement.id}`}
                                                className="btn_edit"
                                            >
                                                <span><FaPenToSquare /></span>Modifier
                                            </Link>
                                            <button
                                                className="btn_delete"
                                                onClick={() => handleDeleteClick(emplacement)}
                                            >
                                                <span><FaRegTrashAlt /></span> Supprimer
                                            </button>
                                        </div>
                                    </div>

                                    <div className="section_Détail_right">
                                        <div className="description_header">
                                            <strong>Description</strong>
                                            <FaPenToSquare className="description_icon" />
                                        </div>
                                        <p className="description_text">{emplacement.description}</p>

                                        <div className="description_info">
                                            <p><strong>Latitude :</strong> {emplacement.latitude || 'Non définie'}</p>
                                            <p><strong>Longitude :</strong> {emplacement.longitude || 'Non définie'}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p>Aucun emplacement trouvé.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationDelete
                affiche={afficheConfirme}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />
            <ToastContainer />
            {/* <ToastNotification /> */}

        </>
    );
}

export default DétailEmplacement;
