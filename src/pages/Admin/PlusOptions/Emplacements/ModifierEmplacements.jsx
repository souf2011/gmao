import { FaChevronLeft, FaList } from "react-icons/fa";
import Header from "../../../../components/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axiosClent from "../../../../Api/AxiosClent";

function ModifierEmplacements() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        nom_emplacement: '',
        address: '',
        latitude: '',
        longitude: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    const Retour = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClent.get(`/emplacements/${id}`);
                setFormData({
                    nom_emplacement: response.data.nom_emplacement || '',
                    address: response.data.address || '',
                    latitude: response.data.latitude || '',
                    longitude: response.data.longitude || '',
                    description: response.data.description || ''
                });
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la requête :', err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClent.put(`/emplacements/${id}`, formData);

            navigate(`/admin/PlusOptions/emplacements/${id}`, {
                state: { message: "Emplacement modifié avec succès" }
            });

        } catch (error) {
            console.error('Erreur lors de la modification :', error);
            toast.error("Erreur lors de la modification !");
        }
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Modifier un Emplacement</h1>
                        <p className='container_subtitle'>
                            Complétez le formulaire pour modifier un emplacement existant dans le système SGTM.
                        </p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                    </div>
                    <div className='container_header_left_cat'>
                        <Link to="/admin/PlusOptions/emplacements/" className='btn_link_cat'>
                            <span><FaList /></span> Liste des Emplacements
                        </Link>
                    </div>
                </div>

                <div className="container_content">
                    <div className="container_formulaire">
                        <form onSubmit={handleSubmit}>
                            <div className="form-categorie">
                                <div className="form-grid">
                                    <div className="form-item">
                                        <label htmlFor="nom_emplacement">Nom Emplacement<span>*</span></label>
                                        <input
                                            type="text"
                                            id="nom_emplacement"
                                            name="nom_emplacement"
                                            placeholder="Saisir le nom de l'emplacement"
                                            value={formData.nom_emplacement}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="address">Adresse<span>*</span></label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Saisir l'adresse"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="latitude">Latitude</label>
                                        <input
                                            type="text"
                                            id="latitude"
                                            name="latitude"
                                            placeholder="Ex: 34.0151"
                                            value={formData.latitude}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="longitude">Longitude</label>
                                        <input
                                            type="text"
                                            id="longitude"
                                            name="longitude"
                                            placeholder="Ex: -6.8326"
                                            value={formData.longitude}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Ajouter une description..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                    />
                                </div>

                                <div className="form-button">
                                    <button type="submit" className="btn_submit">
                                        Enregistrer l'emplacement
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

export default ModifierEmplacements;
