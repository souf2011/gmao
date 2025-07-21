import React, { useState, useEffect } from 'react';
import Header from '../../../../components/Header';
import ConfirmationDelete from '../../../../components/ConfirmationDelete';
import Pagination from '../../../../components/Pagination';
import { FaPlus,  FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import useFiltragePagination from '../../../../hookes/PaginationFiltrage';
import ExportButtons from '../../../../components/ExportButtons';
import FilterTable from '../../../../components/FilterTable';

function ListeDemandeApprovisionnement() {
    const [demandes, setDemandes] = useState([]);
    const [afficheConfirme, setAfficheConfirme] = useState(false);
    const [demandeToDelete, setDemandeToDelete] = useState(null);

    const Retour = () => window.history.back();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/demandes');
                setDemandes(response.data);
            } catch (err) {
                console.error('Erreur lors de la requête :', err);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = (demande) => {
        setDemandeToDelete(demande);
        setAfficheConfirme(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/demandes/${demandeToDelete.id}`);
            setDemandes(demandes.filter(item => item.id !== demandeToDelete.id));
            setAfficheConfirme(false);
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
        }
    };

    const cancelDelete = () => setAfficheConfirme(false);

    const {
        selectedType,
        selectedValue,
        handleFilterChange,
        currentPage,
        setCurrentPage,
        totalPages,
        lignesAffichees,
        filteredData,
        maxRows
    } = useFiltragePagination(demandes, 4);

    return (
        <>
            <Header />

            <div className="container_header_cat">
                <div className="container_header_right">
                    <h1 className="container_title">Liste des Demandes d'Approvisionnement</h1>
                    <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                </div>
                <div className="container_header_left">
                    <Link to="/admin/interventions/demandeapprovisionnement/ajouterdemandeapprovisionnement" className="btn_link">
                        <span><FaPlus /> </span>Ajouter une demande
                    </Link>
                </div>
            </div>

            <div className="container_content-cat">
                <div className="exportFiltrage">
                    <FilterTable
                        filterOptions={['unité', 'designation', 'statut', 'bonCommande']}
                        data={demandes}
                        onFilterChange={handleFilterChange}
                    />
                    <ExportButtons
                        data={demandes}
                        fileName="Liste des demandes d'approvisionnement"
                        columns={["numeroDA","qte", "unite", "reference", "designation", "statut", "bonCommande"]}
                    />
                </div>

                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th>N° D.A</th>
                            <th>QTE</th>
                            <th>UNITÉ</th>
                            <th>RÉFÉRENCE</th>
                            <th>DÉSIGNATION</th>
                            <th>STATUT</th>
                            <th>B.C</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {lignesAffichees.length > 0 ? (
                            lignesAffichees.map((elm) => (
                                <tr key={elm.id}>
                                    <td>{elm.numeroDA}</td>
                                    <td>{elm.qte}</td>
                                    <td>{elm.unite}</td>
                                    <td>{elm.reference}</td>
                                    <td>{elm.designation}</td>
                                    <td>{elm.statut}</td>
                                    <td>{elm.bc}</td>
                                    <td className="table_action">
                                        <div className="action-wrapper">
                                            <Link to={`/admin/interventions/DemandeApprovisionnement/ModifierDA/${elm.id}`}>
                                                <span><FaPenToSquare /></span>
                                            </Link>

                                            <button onClick={() => handleDeleteClick(elm)}>
                                                <span><FaRegTrashAlt /></span>
                                            </button>

                                            <span><PiDotsThreeOutlineVerticalLight /></span>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8}>Aucune demande trouvée</td>
                            </tr>
                        )}
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

export default ListeDemandeApprovisionnement;
