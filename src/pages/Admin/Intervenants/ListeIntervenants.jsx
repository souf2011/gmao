import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import ConfirmationDelete from '../../../components/ConfirmationDelete';
import FilterTable from '../../../components/FilterTable';
import useFiltragePagination from '../../../hookes/PaginationFiltrage';
import ExportButtons from '../../../components/ExportButtons';
import axiosClent from '../../../Api/AxiosClent.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListeIntervenants() {
    const [intervenants, setIntervenants] = useState([]);
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [intervenantDelete, setIntervenantDelete] = useState(null);
    const [loading, setLoading] = useState(true);





    // --------------------fetch Data---------------------> 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClent.get('/intervenants');
                setIntervenants(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la requête :', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);




    // -------------------confirmation------------------------>
    const handleDeleteClick = (intervenant) => {
        setIntervenantDelete(intervenant);
        setAfficheConfirme(true);
    };
    const cancelDelete = () => setAfficheConfirme(false);

    const confirmDelete = async () => {
        if (!intervenantDelete) return;

        try {
            await axiosClent.delete(`intervenants/${intervenantDelete.id}`);
            setIntervenants(prev => prev.filter(e => e.id !== intervenantDelete.id));
            setAfficheConfirme(false);
            toast.success('intervenants supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            toast.error("Erreur lors de la suppression !");
        }
    };
    // ------------------end-confirmation------------------------>





    // -----------------------import hook pagination avec filtrage ---------------->
    const {
        handleFilterChange,
        currentPage,
        setCurrentPage,
        totalPages,
        lignesAffichees,
        filteredData,
        maxRows
    } = useFiltragePagination(intervenants, 4);



    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Liste des intervenants</h1>
                        <p className='container_subtitle'>Gestion des profils des intervenants actifs</p>
                    </div>
                    <div className='container_header_left'>
                        <Link to={'/admin/Intervenants/AjouterIntervenant'} className='btn_link'><span><FaPlus /></span> Ajouter un Intervenant</Link>
                    </div>
                </div>

                <div className="container_content">

                    <div className="exportFiltrage">
                        <FilterTable
                            filterOptions={['Poste', 'Service']}
                            data={intervenants}
                            onFilterChange={handleFilterChange}
                        />
                        <ExportButtons
                            data={intervenants}
                            fileName="Liste des Intervenants"
                            columns={["Nom_intervenant", "Poste", "Service", "Email", "Telephone"]}
                        />
                    </div>

                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Nom complet</th>
                                <th>Poste</th>
                                <th>Service</th>
                                <th>E-mail</th>
                                <th>Téléphone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: 12 }}>
                                        Chargement des données...
                                    </td>
                                </tr>
                            ) : (
                                lignesAffichees.length > 0 ? lignesAffichees.map((elm, i) => (
                                    <tr key={i}>
                                        <td>{elm.Nom_intervenant}</td>
                                        <td>{elm.Poste}</td>
                                        <td>{elm.Service}</td>
                                        <td>{elm.Email}</td>
                                        <td>{elm.Telephone}</td>
                                        <td className='table_action'>
                                            <div className="action-wrapper">
                                                <Link to={`/admin/intervenants/Modifierintervenant/${elm.id}`}> <span><FaPenToSquare /></span> </Link>
                                                <button onClick={() => handleDeleteClick(elm)}><span><FaRegTrashAlt /></span></button>
                                                <Link to={`/admin/intervenants/Intervenant/${elm.id}`}><span><PiDotsThreeOutlineVerticalLight /></span></Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) :
                                    <tr>
                                        <td colSpan={4} style={{ padding: 12 }}>
                                            aucune Intervenant trouvée
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={setCurrentPage}
                    maxRows={maxRows}
                    totalItems={filteredData.length}
                />

                <ConfirmationDelete
                    affiche={afficheConfirme}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </div>
            <ToastContainer
                autoClose={1500}
            />
        </>
    );
}

export default ListeIntervenants;
