import React, { useState, useEffect } from 'react';
import Header from "../../../../components/Header";
import { FaPlus, FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import Pagination from "../../../../components/Pagination";
import ConfirmationDelete from '../../../../components/ConfirmationDelete';
import useFiltragePagination from '../../../../hookes/PaginationFiltrage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '../../../../components/Search';
import ExportButtons from '../../../../components/ExportButtons';
import axiosClent from '../../../../Api/AxiosClent';

function ListsEmplacements() {
    const [emplacements, setEmplacements] = useState([]);
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [emplacementToDelete, setEmplacementToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const Retour = () => window.history.back();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClent.get('/emplacements');
                setEmplacements(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la requête :', err);
                setLoading(false);
                toast.error("Erreur de chargement des emplacements");
            }
        };

        fetchData();
    }, []);

    // Delete with confirmation
    const handleDeleteClick = (emplacement) => {
        setEmplacementToDelete(emplacement);
        setAfficheConfirme(true);
    };

    const confirmDelete = async () => {
        if (!emplacementToDelete) return;

        try {
            await axiosClent.delete(`emplacements/${emplacementToDelete.id}`);
            setEmplacements(prev => prev.filter(e => e.id !== emplacementToDelete.id));
            setAfficheConfirme(false);
            toast.success('Emplacement supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            toast.error("Erreur lors de la suppression !");
        }
    };

    const cancelDelete = () => setAfficheConfirme(false);

    // Handle search change
    const handleSearchChange = (searchValue) => {
        setSearchTerm(searchValue.toLowerCase());
    };

    const filteredEmplacements = emplacements.filter((elm) =>
        elm.nom_emplacement.toLowerCase().includes(searchTerm) ||
        elm.description.toLowerCase().includes(searchTerm) ||
        elm.address.toLowerCase().includes(searchTerm)
    );

    const {
        currentPage,
        setCurrentPage,
        totalPages,
        lignesAffichees,
        maxRows
    } = useFiltragePagination(filteredEmplacements, 6);

    return (
        <>
            <Header />
            <div className='container'>
                <div className="container_header">
                    <div className="container_header_right">
                        <h1 className="container_title">Liste des Emplacements</h1>
                        <p className="container_subtitle">Vous pouvez gérer les emplacements ici.</p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                    </div>
                    <div className="container_header_left_cat">
                        <Link to="/admin/PlusOptions/emplacements/AjouterEmplacement" className="btn_link_cat">
                            <span><FaPlus /></span> Ajouter un Emplacement
                        </Link>
                    </div>
                </div>

                <div className="container_content">
                    <div className="exportFiltrage">
                        <Search onSearchChange={handleSearchChange} />
                        <ExportButtons
                            data={emplacements}
                            fileName="Liste des Emplacements"
                            columns={["nom_emplacement", "description", "address", "latitude", "longitude"]}
                        />
                    </div>

                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Nom Emplacement</th>
                                <th>Description</th>
                                <th>Adresse</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'start', padding: '12px' }}>
                                        Chargement des emplacements...
                                    </td>
                                </tr>
                            ) : (lignesAffichees.length > 0 ? (
                                lignesAffichees.map((elm) => (
                                    <tr key={elm.id}>
                                        <td>{elm.nom_emplacement}</td>
                                        <td>{elm.description}</td>
                                        <td>{elm.address}</td>
                                        <td>{elm.latitude}</td>
                                        <td>{elm.longitude}</td>
                                        <td className="table_action">
                                            <Link to={`/admin/PlusOptions/emplacements/ModifierEmplacement/${elm.id}`}>
                                                <span><FaPenToSquare /></span>
                                            </Link>
                                            <button onClick={() => handleDeleteClick(elm)}>
                                                <span><FaRegTrashAlt /></span>
                                            </button>
                                            <Link to={`/admin/PlusOptions/emplacements/${elm.id}`}>
                                                <span><PiDotsThreeOutlineVerticalLight /></span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ padding: '12px', textAlign: 'center' }}>
                                        Aucun emplacement trouvé
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={setCurrentPage}
                        maxRows={maxRows}
                        totalItems={filteredEmplacements.length}
                    />
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
            {/* <ToastNotification /> */}
        </>
    );
}

export default ListsEmplacements;
