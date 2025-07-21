import { FaChevronLeft, FaList } from "react-icons/fa";
import Header from "../../../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { useState } from "react";
import axiosClient from "../../../../Api/AxiosClent";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    return {
        formData,
        handleChange,
        setFormData
    };
};

function AjouterCategorie() {
    const { formData, handleChange, setFormData } = useForm({
        categorie_name: '',
        categorie_image: null,
        categorie_description: ''
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange(e);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const Retour = () => {
        window.history.back();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('categorie_name', formData.categorie_name);
        formDataToSend.append('categorie_description', formData.categorie_description);
        if (formData.categorie_image) {
            formDataToSend.append('categorie_image', formData.categorie_image);
        }

        try {
            const response = await axiosClient.post('/categories', formDataToSend);
            toast.success("Catégorie ajoutée avec succès !");
            setFormData({
                categorie_name: '',
                categorie_image: null,
                categorie_description: ''
            });
            setImagePreview(null);
            setTimeout(() => {
                navigate('/admin/PlusOptions/catégorie/');
            }, 2000);
        } catch (error) {
            console.error('Erreur lors de l\'ajout :', error.response?.data);
            toast.error(`Erreur : ${error.response?.data?.message || error.message}`);
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="container_header">
                    <div className="container_header_right">
                        <h1 className="container_title">Ajouter une Catégorie</h1>
                        <p className="container_subtitle">
                            Complétez le formulaire pour ajouter une catégorie au système SGTM.
                        </p>
                        <span className="retour" onClick={Retour}>
                            <FaChevronLeft /> retour
                        </span>
                    </div>
                    <div className="container_header_left_cat">
                        <Link to="/admin/PlusOptions/catégorie/" className="btn_link_cat">
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
                                        <label htmlFor="categorie_name">Nom Catégorie <span>*</span></label>
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
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageChange}
                                        />
                                        <label htmlFor="categorie_image" className="label_image">
                                            <div className={`input_image ${imagePreview ? 'has-preview' : ''}`}>
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview"
                                                        className="image-preview"
                                                        style={{ width: '40px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <>
                                                        <span>Choisir une image</span>
                                                        <span><IoImageOutline /></span>
                                                    </>
                                                )}
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
                                    <button type="submit" className="btn_submit" disabled={loading}>
                                        {loading ? 'Chargement...' : 'Enregistrer Catégorie'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={2000}
            />
        </>
    );
}

export default AjouterCategorie;
