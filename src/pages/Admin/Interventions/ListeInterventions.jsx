import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import ConfirmationDelete from '../../../components/ConfirmationDelete';
import Pagination from '../../../components/Pagination';
import { FaPlus, FaSearch, FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import axiosClent from '../../../Api/AxiosClent.js';
import useFiltragePagination from '../../../hookes/PaginationFiltrage';
import ExportButtons from '../../../components/ExportButtons';
import FilterTable from '../../../components/FilterTable';



function ListeInterventions() {
    const [interventions, setInterventions] = useState([]);
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [interventionToDelete, setInterventionToDelete] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");



    const Retour = () => window.history.back();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClent.get('/interventions');
                setInterventions(response.data);
            } catch (err) {
                console.error('Erreur lors de la requête :', err);
            }
        };

        fetchData();
    }, []);






    const handleDeleteClick = (intervention) => {
        setInterventionToDelete(intervention);
        setAfficheConfirme(true);
    };
    const confirmDelete = async () => {
        try {
            await axiosClent.delete(`http://127.0.0.1:8000/api/interventions/${interventionToDelete.id}`);
            setInterventions(interventions.filter(item => item.id !== interventionToDelete.id));
            setAfficheConfirme(false);
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            setError(error);
        }
    };

    const cancelDelete = () => setAfficheConfirme(false);
    // -----------------------import hook pagination avec filtrage ---------------->

    const {
        handleFilterChange,
        currentPage,
        setCurrentPage,
        totalPages,
        lignesAffichees,
        filteredData,
        maxRows
    } = useFiltragePagination(interventions, 4);

    console.log("👉 lignesAffichees:", lignesAffichees);
    console.log("👉 interventions:", interventions);


    return (
        <>
            <Header />
            <div className="container_header_cat">
                <div className="container_header_right">
                    <h1 className="container_title">Liste des Interventions</h1>
                    <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                </div>
                <div className="container_header_left">
                    <Link to="/admin/interventions/DemandeIntervention" className="btn_link">
                        <span><FaPlus /></span> Demande d'Intervention
                    </Link>
                </div>
            </div>

            <div className="container_content-cat">
                <div className="exportFiltrage">
                    <FilterTable
                        filterOptions={['emplacement', 'etat', 'statut']}
                        data={interventions}
                        onFilterChange={handleFilterChange}
                    />
                    <ExportButtons
                        data={interventions}
                        fileName="Liste des interventions"
                        columns={["equipement", "description", "statut", "etat", "responsable", "emplacement"]}
                    />
                </div>


                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th>EQUIPEMENT</th>
                            <th>DESCRIPTION</th>
                            <th>STATUT</th>
                            <th>ETAT</th>
                            <th>RESPONSABLE</th>
                            <th>EMPLACEMENT</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {!error ?
                            lignesAffichees.length > 0 ? lignesAffichees.map((elm, i) => (
                                    <tr key={i}>
                                        <td>{elm.equipement}</td>
                                        <td>{elm.description}</td>
                                        <td>{elm.statut}</td>
                                        <td>{elm.etat}</td>
                                        <td>{elm.responsable}</td>
                                        <td>{elm.emplacement}</td>
                                        <td className="table_action">
                                            <div className="action-wrapper">
                                                <Link to={`/admin/interventions/ModifierIntervention/${elm.id}`}>
                                                    <span><FaPenToSquare /></span>
                                                </Link>
                                                <button onClick={() => handleDeleteClick(elm)}>
                                                    <span><FaRegTrashAlt /></span>
                                                </button>
                                                <Link to={`/admin/interventions/${elm.id}`}>  <span><PiDotsThreeOutlineVerticalLight /></span></Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) :
                                    <tr>
                                        <td colSpan={7}>aucun interventions trouver</td>
                                    </tr>
                                : error}
                    </tbody>
                </table>

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
        </>
    );
}

export default ListeInterventions;
