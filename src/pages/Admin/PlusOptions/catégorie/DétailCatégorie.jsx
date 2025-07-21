import React, { useEffect, useState } from 'react';
import Header from '../../../../components/Header';
import ConfirmationDelete from '../../../../components/ConfirmationDelete';
import { FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from "../../../../Api/AxiosClent";
import { toast } from 'react-toastify';
import default_image_url from '../../../../assets/images/default_image.png';

function DetailCategorie() {
  const { id } = useParams();
  const [categorie, setCategorie] = useState(null);
  const [afficheConfirme, setAfficheConfirme] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const response = await axiosClient.get(`/categories/${id}`);
        if (response.status === 200) {
          setCategorie(response.data);
        } else {
          console.error('Catégorie non trouvée');
          navigate('/admin/PlusOptions/catégorie/');
        }
      } catch (error) {
        console.error(error);
        navigate('/admin/PlusOptions/catégorie/');
      } finally {
        setLoading(false);
      }
    };
    fetchCategorie();
  }, [id, navigate]);

  const handleDeleteClick = (categorie) => {
    setCategoryToDelete(categorie);
    setAfficheConfirme(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await axiosClient.delete(`/categories/${categoryToDelete.id}`);
      setAfficheConfirme(false);
      toast.success('Catégorie supprimée avec succès');
      navigate('/admin/PlusOptions/catégorie/', {
        state: { message: "Catégorie supprimée avec succès" }
      });
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      toast.error("Erreur lors de la suppression !");
    }
  };

  const cancelDelete = () => setAfficheConfirme(false);
  const handleRetour = () => window.history.back();

  return (
    <>
      <Header />
      <div className='container'>
        <div className='container_header'>
          <div className='container_header_right'>
            <h1 className='container_title'>Détail d'une Catégorie</h1>
            <p className='container_subtitle'>
              Cette section présente les détails de la catégorie d'équipement
            </p>
            <span className="retour" onClick={handleRetour}>
              <FaChevronLeft /> retour
            </span>
          </div>
        </div>

        <div className="container_content">
          <div className="container_Détail_cat">
            {loading ? (
              <p style={{ padding: "1rem" }}>Chargement des données...</p>
            ) : categorie ? (
              <div className="section_Détail">
                <div className="section_Détail_left">
                  <div className='info'>
                    <img
                      src={categorie.categorie_image ? `${import.meta.env.VITE_BACKEND_URL}/storage/categories/${categorie.categorie_image}` : default_image_url}
                      alt={categorie.categorie_name}
                    />
                    <h2>{categorie.categorie_name}</h2>
                  </div>
                  <div className="Détail_actions">
                    <Link
                      to={`/admin/PlusOptions/catégorie/Modifier/${categorie.id}`}
                      className="btn_edit"
                    >
                      <span><FaPenToSquare /></span>Modifier
                    </Link>
                    <button className="btn_delete" onClick={() => handleDeleteClick(categorie)}>
                      <span><FaRegTrashAlt /></span> Supprimer
                    </button>
                  </div>
                </div>

                <div className="section_Détail_right">
                  <div className="description_header">
                    <strong>Description</strong>
                    <FaPenToSquare className="description_icon" />
                  </div>
                  <p className="description_text">{categorie.categorie_description}</p>
                </div>
              </div>
            ) : (
              <div className="section_Détail">
                <div className="section_Détail_left">
                  <div className='info'>
                    <h2>Catégorie non trouvée</h2>
                  </div>
                </div>
                <div className="section_Détail_right">
                  <div className="description_header">
                    <strong>Aucune information disponible</strong>
                  </div>
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

export default DetailCategorie;
