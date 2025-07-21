import { FaChevronLeft, FaList } from "react-icons/fa";
import Header from "../../../../components/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoImageOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import axiosClent from "../../../../Api/AxiosClent";

function ModifierCategorie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categorie_name: '',
    categorie_description: '',
    categorie_image: null,
  });

  const Retour = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClent.get(`/categories/${id}`);
        const data = response.data;
        setFormData({
          categorie_name: data.categorie_name || '',
          categorie_description: data.categorie_description || '',
          categorie_image: data.categorie_image || null,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie :", error);
        toast.error("Impossible de charger les données de la catégorie.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "categorie_image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('categorie_name', formData.categorie_name);
      formDataToSend.append('categorie_description', formData.categorie_description);
      if (formData.categorie_image) {
        formDataToSend.append('categorie_image', formData.categorie_image);
      }

      const response = await axiosClent.put(`/categories/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/admin/PlusOptions/categories/${id}`, {
        state: { message: "Catégorie modifiée avec succès" }
      });

    } catch (error) {
      console.error('Erreur lors de la modification :', error);
      if (error.response && error.response.data.errors) {
        // Display validation errors from server
        Object.values(error.response.data.errors).forEach(err => {
          toast.error(err[0]);
        });
      } else {
        toast.error("Erreur lors de la modification !");
      }
    }
  };

  return (
    <>
      <Header />
      <div className='container'>
        <div className='container_header'>
          <div className='container_header_right'>
            <h1 className='container_title'>Modifier une Catégorie</h1>
            <p className='container_subtitle'>
              Complétez le formulaire pour modifier une catégorie existante dans le système SGTM.
            </p>
            <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
          </div>
          <div className='container_header_left_cat'>
            <Link to="/admin/PlusOptions/catégorie/" className='btn_link_cat'>
              <span><FaList /></span> Liste des Catégories
            </Link>
          </div>
        </div>

        <div className="container_content">
          <div className="container_formulaire">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-categorie">
                <div className="form-grid">
                  <div className="form-item">
                    <label htmlFor="categorie_name">Nom Catégorie<span>*</span></label>
                    <input
                      type="text"
                      id="categorie_name"
                      name="categorie_name"
                      placeholder="Saisir le nom de la catégorie"
                      value={formData.categorie_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="categorie_image">Image (optionnel)</label>
                    <input
                      type="file"
                      id="categorie_image"
                      name="categorie_image"
                      style={{ display: 'none' }}
                      onChange={handleChange}
                    />
                    <label htmlFor="categorie_image" className="label_image">
                      <div className="input_image">
                        <span>{formData.categorie_image?.name || "Image (optionnel)"}</span>
                        <span><IoImageOutline /></span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-item">
                  <label htmlFor="categorie_description">Commentaire</label>
                  <textarea
                    id="categorie_description"
                    name="categorie_description"
                    placeholder="Saisir un commentaire..."
                    value={formData.categorie_description}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>

                <div className="form-button">
                  <button type="submit" className="btn_submit">
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ModifierCategorie;
