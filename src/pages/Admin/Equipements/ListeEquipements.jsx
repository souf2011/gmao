import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { FaList, FaPlus, FaSearch, FaRegTrashAlt } from "react-icons/fa";
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

function ListeEquipements() {
  const [equipements, setEquipements] = useState([]);
  const [afficheConfirme, setAfficheConfirme] = useState(false);
  const [equipementDelete, setEquipementDelete] = useState(null);
    const [loading, setLoading] = useState(true);

  // --------------------fetch Data-------------------->
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClent.get('/equipements');
        setEquipements(response.data);
      } catch (err) {
        console.error('Erreur lors de la requête :', err);
        toast.error("Erreur lors de la récupération des données !");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 
  // -------------------confirmation------------------------>

  const handleDeleteClick = (elm) => {
    setEquipementDelete(elm);
    setAfficheConfirme(true);
  };

  const confirmDelete = async () => {
    try {
      if (equipementDelete) {
        await axiosClent.delete(`equipements/${equipementDelete.id}`);
        setEquipements(prev => prev.filter(e => e.id !== equipementDelete.id));
        toast.success('Equipement supprimé avec succès');
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

  // -----------------------import hook pagination avec filtrage ---------------->
  const {
    handleFilterChange,
    currentPage,
    setCurrentPage,
    totalPages,
    lignesAffichees,
    filteredData,
    maxRows
  } = useFiltragePagination(equipements, 4);

  return (
    <>
      <Header />
      <div className='container'>
        <div className='container_header'>
          <div className='container_header_right'>
            <h1 className='container_title'>Liste des équipements</h1>
            <p className='container_subtitle'>Consultez ci-dessous les équipements disponibles et leur statut.</p>
          </div>
          <div className='container_header_left'>
            <Link to={'/admin/equipements/AjouterEquipement'} className='btn_link'><span><FaPlus /></span> Ajouter un équipement</Link>
          </div>
        </div>

        <div className="container_content">
          <div className="exportFiltrage">
            <FilterTable
              filterOptions={['Categorie', 'Emplacement', 'Status']}
              data={equipements}
              onFilterChange={handleFilterChange}
            />
            <div className="select_filter_table">
              <select
                  onChange={(e) => handleFilterChange('Trier', '', e.target.value)}
                  defaultValue=""
              >
                <option value="">Trier(compteur)</option>
                <option value="asc">croissant</option>
                <option value="desc">decroissant</option>
              </select>
            </div>

            <ExportButtons
              data={equipements}
              fileName="Liste des Equipements"
              columns={["Nom_Equipement", "Categorie", "N_Serie", "Emplacement", "Compteur", "Status"]}
            />


          </div>


          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Equipement</th>
                <th>Catégorie</th>
                <th>N° Série</th>
                <th>Emplacement</th>
                <th>Compteur</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading ? (
                <tr className="border-b hover:bg-gray-50 transition duration-200">
                  <td colSpan={7} className="px-4 py-2">
                    Chargement des Equipements...
                  </td>
                </tr>
              ) : lignesAffichees.length > 0 ? (
                lignesAffichees.map((elm, i) => (
                  <tr key={i}>
                    <td>{elm.Nom_Equipement}</td>
                    <td>{elm.categories ? elm.categories.categorie_name : 'Non spécifié'}</td>
                    <td>{elm.N_Serie}</td>
                    <td>{elm.emplacement ? elm.emplacement.name : 'Non spécifié'}</td>
                    <td>{elm.Compteur}</td>
                    <td>
                      <span className={`status ${elm.Status === 'disponible' ? 'disponible' : elm.Status === 'approvisionnement' ? 'approvisionnement' : elm.Status === 'en_reparation' ? 'en_reparation' : 'statut_inconnu'}`}>
                        {elm.Status}
                      </span>
                    </td>
                    <td className='table_action'>
                      <Link to={`/admin/equipements/ModifierEquipement/${elm.id}`}> <span><FaPenToSquare /></span> </Link>
                      <button onClick={() => handleDeleteClick(elm)}>  <span><FaRegTrashAlt /></span></button>
                      <Link to={`/admin/equipements/DetailEquipement/${elm.id}`}>  <span><PiDotsThreeOutlineVerticalLight /></span></Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: 12 }}>
                    aucune Equipement trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ----------------componant pagination--------------------- */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
          maxRows={maxRows}
          totalItems={filteredData.length}
        />

        {/* ----------------componant ConfirmationDelete--------------------- */}
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

export default ListeEquipements;
