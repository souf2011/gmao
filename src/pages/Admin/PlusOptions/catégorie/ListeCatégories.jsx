import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClent from '../../../../Api/AxiosClent';
import Header from '../../../../components/Header';
import Pagination from '../../../../components/Pagination';
import ConfirmationDelete from '../../../../components/ConfirmationDelete';
import ExportButtons from '../../../../components/ExportButtons';
import useFiltragePagination from '../../../../hookes/PaginationFiltrage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaRegTrashAlt, FaChevronLeft } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { PiDotsThreeOutlineVerticalLight } from 'react-icons/pi';

function ListeCategorie() {
  const [categories, setCategories] = useState([]);
  const [afficheConfirme, setAfficheConfirme] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const Retour = () => window.history.back();

  // ----------------------------- fetch data categories -----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClent.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Erreur lors de la requête :', err);
        toast.error("Erreur de chargement des catégories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------------------------- delete avec confirmation ----------------
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setAfficheConfirme(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete?.id) return;
    try {
      await axiosClent.delete(`/categories/${categoryToDelete.id}`);
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      toast.success("Catégorie supprimée avec succès !");
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setAfficheConfirme(false);
    }
  };

  const cancelDelete = () => setAfficheConfirme(false);

  // ----------------------- filtrage + pagination -----------------------
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    lignesAffichees,
    maxRows
  } = useFiltragePagination(categories, 4);

  return (
    <>
      <Header />

      <div className="container_header_cat">
        <div className="container_header_right_cat">
          <h1 className="container_title">Liste des Catégories</h1>
          <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
        </div>
        <div className="container_header_left_cat">
          <Link to="/admin/PlusOptions/catégorie/AjouterCatégorie" className="btn_link_cat">
            <span><FaPlus /></span> Ajouter une Catégorie
          </Link>
        </div>
      </div>

      <div className="container_content-cat">
        <div className="exportFiltrage">

          <ExportButtons
            data={categories}
            fileName="Liste des Catégories"
            columns={["categorie_name", "categorie_description"]}
          />
        </div>

        <table className="table">
          <thead className="table-header">
            <tr>
              <th></th>
              <th>NOM CATÉGORIE</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {loading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'start', padding: '12px' }}>
                  Chargement des catégories...
                </td>
              </tr>
            ) : (
              lignesAffichees.length > 0 ? lignesAffichees.map((elm) => (
                <tr key={elm.id}>
                  <td className="td_with_image">


                  </td>
                  <td>{elm.categorie_name}</td>
                  <td>{elm.categorie_description}</td>
                  <td className="table_action">
                    <Link to={`/admin/PlusOptions/catégorie/modifier/${elm.id}`}>
                      <span><FaPenToSquare /></span>
                    </Link>
                    <button onClick={() => handleDeleteClick(elm)}>
                      <span><FaRegTrashAlt /></span>
                    </button>
                    <Link to={`/admin/PlusOptions/catégorie/${elm.id}`}>
                      <span><PiDotsThreeOutlineVerticalLight /></span>
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} style={{ padding: 12 }}>
                    Aucune catégorie trouvée.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
          maxRows={maxRows}
          totalItems={lignesAffichees.length}
        />
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

export default ListeCategorie;
