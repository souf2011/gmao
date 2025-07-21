import Header from '../../../components/Header';
import { IoImageOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import axiosClient from '../../../Api/AxiosClent.js';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function AjouterIntervenant() {
    const Retour = () => window.history.back();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [services, setServices] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
        // reset error when changing input
        setErrors((prev) => ({
            ...prev,
            [name]: null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            await axiosClient.post('/intervenants', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success("Intervenant ajouté avec succès !");
            setFormData({});
            setErrors({});
            setTimeout(() => navigate('/admin/intervenants/'), 2000);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                toast.error("Veuillez corriger les erreurs du formulaire.");
            } else {
                console.error('Erreur :', error);
                toast.error("Une erreur s’est produite.");
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/services');
                setServices(response.data);
            } catch (err) {
                console.error('Erreur lors du chargement des services :', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const inputClass = (field) => errors[field] ? 'input-error' : '';

    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Ajouter un Intervenant</h1>
                        <p className='container_subtitle'>Complétez le formulaire pour ajouter un intervenant au système SGTM.</p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> Retour</span>
                    </div>
                </div>

                <div className="container_content">
                    <div className="container_formulaire">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Nom_intervenant">Nom complet</label>
                                    <input
                                        type="text"
                                        id="Nom_intervenant"
                                        name="Nom_intervenant"
                                        className={inputClass('Nom_intervenant')}
                                        placeholder={errors.Nom_intervenant ? errors.Nom_intervenant[0] : "Saisir le nom"}
                                        value={formData.Nom_intervenant || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.Nom_intervenant && <p className="error">{errors.Nom_intervenant[0]}</p>}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Date_Naissance">Date de Naissance</label>
                                    <input
                                        type="date"
                                        id="Date_Naissance"
                                        name="Date_Naissance"
                                        className={inputClass('Date_Naissance')}
                                        value={formData.Date_Naissance || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.Date_Naissance && <p className="error">{errors.Date_Naissance[0]}</p>}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Telephone">Téléphone</label>
                                    <input
                                        type="text"
                                        id="Telephone"
                                        name="Telephone"
                                        className={inputClass('Telephone')}
                                        placeholder={errors.Telephone ? errors.Telephone[0] : "Saisir le téléphone"}
                                        value={formData.Telephone || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.Telephone && <p className="error">{errors.Telephone[0]}</p>}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        type="email"
                                        id="Email"
                                        name="Email"
                                        className={inputClass('Email')}
                                        placeholder={errors.Email ? errors.Email[0] : "Saisir l'email"}
                                        value={formData.Email || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.Email && <p className="error">{errors.Email[0]}</p>}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Genre">Genre</label>
                                    <select
                                        id="Genre"
                                        name="Genre"
                                        className={inputClass('Genre')}
                                        value={formData.Genre || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sélectionner un genre</option>
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                    </select>
                                    {errors.Genre && <p className="error">{errors.Genre[0]}</p>}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Poste">Poste</label>
                                    <select
                                        id="Poste"
                                        name="Poste"
                                        className={inputClass('Poste')}
                                        value={formData.Poste || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sélectionner le poste</option>
                                        <option value="Chef de projet">Chef de projet</option>
                                        <option value="Responsable marketing">Responsable marketing</option>
                                        <option value="Développeur full-stack">Développeur full-stack</option>
                                        <option value="Architecte">Architecte</option>
                                        <option value="Comptable">Comptable</option>
                                        <option value="Directeur général">Directeur général</option>
                                        <option value="Ingénieur qualité">Ingénieur qualité</option>
                                        <option value="Responsable des ressources humaines">RH</option>
                                    </select>
                                    {errors.Poste && <p className="error">{errors.Poste[0]}</p>}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="CIN">CIN</label>
                                    <input
                                        type="text"
                                        id="CIN"
                                        name="CIN"
                                        className={inputClass('CIN')}
                                        placeholder={errors.CIN ? errors.CIN[0] : "Saisir le CIN"}
                                        value={formData.CIN || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.CIN && <p className="error">{errors.CIN[0]}</p>}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Date_embauche">Date d'embauche</label>
                                    <input
                                        type="date"
                                        id="Date_embauche"
                                        name="Date_embauche"
                                        className={inputClass('Date_embauche')}
                                        value={formData.Date_embauche || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.Date_embauche && <p className="error">{errors.Date_embauche[0]}</p>}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Service">Service</label>
                                    <select
                                        id="Service"
                                        name="Service"
                                        className={inputClass('Service')}
                                        value={formData.Service || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sélectionner un service</option>
                                        {services.map((item) => (
                                            <option key={item.id} value={item.nom_service}>
                                                {item.nom_service}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.Service && <p className="error">{errors.Service[0]}</p>}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Image">Image de l'intervenant</label>
                                    <input
                                        type="file"
                                        id="Image"
                                        name="Image"
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="Image" className="label_image">
                                        <div className="input_image">
                                            <span>Image (optionnel)</span>
                                            <span><IoImageOutline /></span>
                                        </div>
                                    </label>
                                    {errors.Image && <p className="error">{errors.Image[0]}</p>}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Type_Fichier">Type du fichier</label>
                                    <select
                                        id="Type_Fichier"
                                        name="Type_Fichier"
                                        className={inputClass('Type_Fichier')}
                                        value={formData.Type_Fichier || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sélectionner le type de fichier</option>
                                        <option value="CV">CV</option>
                                        <option value="Lettre de motivation">Lettre de motivation</option>
                                        <option value="Certificat">Certificat</option>
                                    </select>
                                    {errors.Type_Fichier && <p className="error">{errors.Type_Fichier[0]}</p>}
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Fichier_intervenant">Choisir un fichier</label>
                                    <input
                                        type="file"
                                        id="Fichier_intervenant"
                                        name="Fichier_intervenant"
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="Fichier_intervenant" className="label_image">
                                        <div className="input_image">
                                            <span>Télécharger le fichier</span>
                                        </div>
                                    </label>
                                    {errors.Fichier_intervenant && <p className="error">{errors.Fichier_intervenant[0]}</p>}
                                </div>
                            </div>

                            <div className="form-button">
                                <button type="submit" className="btn_submit">Soumettre</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={2000} />
        </>
    );
}

export default AjouterIntervenant;
