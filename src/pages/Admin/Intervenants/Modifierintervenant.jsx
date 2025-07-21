import Header from '../../../components/Header';
import { IoImageOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Modifierintervenant() {
    const { id } = useParams();
    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState('');
    const [formData, setFormData] = useState({
        Nom_intervenant: '',
        Date_Naissance: '',
        Telephone: '',
        Email: '',
        Genre: '',
        Poste: '',
        CIN: '',
        Date_Embauche: '',
        Service: '',
        Type_Fichier: '',
        Image: '',
        Fichier: ''
    });
    const Retour = () => {
        window.history.back();
    }





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/intervenants/${id}`);
                const elm = response.data;
                if (elm) {
                    setFormData({
                        "Nom_intervenant": elm.Nom_intervenant,
                        "Date_Naissance": elm.Date_Naissance,
                        "Telephone": elm.Telephone,
                        "Email": elm.Email,
                        "Genre": elm.Genre,
                        "Poste": elm.Poste,
                        "CIN": elm.CIN,
                        "Date_Embauche": elm.DateEmbauche,
                        "Service": elm.Service,
                        "Type_Fichier": elm.TypeFichier,
                        "Image": elm.Image,
                        "Fichier": elm.Fichier
                    });
                } else {
                    setErreur('Intervenant non trouvé');
                }
            } catch (err) {
                setErreur('Erreur lors de la récupération des données');
                console.error(err);
            }
        };

        fetchData();
    }, [id]);






    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSucces('Formulaire soumis avec succès!');
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Modifier l'intervenant</h1>
                        <p className='container_subtitle'>Complétez le formulaire pour modifier les informations de l'intervenant dans le système SGTM.</p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                    </div>
                    <div className='container_header_left'></div>
                </div>
                <div className="container_content">
                    <div className="container_formulaire">
                        <form onSubmit={handleSubmit}>
                            {erreur && <p className="form-error">{erreur}</p>}
                            <div className="first_partie_form">
                                <div className="form-grid">
                                    <div className="form-item">
                                        <label htmlFor="Nom_intervenant">Nom complet </label>
                                        <input type="text" id="Nom_intervenant" name="Nom_intervenant" placeholder="Saisir le nom d'intervenant" value={formData.Nom_intervenant} onChange={handleChange} required />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="Date_Naissance">Date de Naissance</label>
                                        <input type="date" id="Date_Naissance" name="Date_Naissance" value={formData.Date_Naissance} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-item">
                                        <label htmlFor="Telephone">Téléphone </label>
                                        <input type="text" id="Telephone" name="Telephone" placeholder="Saisir l'adresse email" value={formData.Telephone} onChange={handleChange} required />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="Email">Email </label>
                                        <input type="email" id="Email" name="Email" placeholder="Saisir l'adresse email" value={formData.Email} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-item">
                                        <label htmlFor="Genre">Genre </label>
                                        <select id="Genre" name="Genre" value={formData.Genre} onChange={handleChange} required>
                                            <option value="" >Sélectionner un genre</option>
                                            <option value="Homme">Homme</option>
                                            <option value="Femme">Femme</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="Poste">Poste</label>
                                        <select id="Poste" name="Poste" value={formData.Poste} onChange={handleChange} required>
                                            <option value="" >Sélectionner le poste</option>
                                            <option value="Chef de projet">Chef de projet</option>
                                            <option value="Responsable marketing">Responsable marketing</option>
                                            <option value="Développeur full-stack">Développeur full-stack</option>
                                            <option value="Architecte">Architecte</option>
                                            <option value="Comptable">Comptable</option>
                                            <option value="Directeur général">Directeur général</option>
                                            <option value="Ingénieur qualité">Ingénieur qualité</option>
                                            <option value="Responsable des ressources humaines">Responsable des ressources humaines</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-item">
                                        <label htmlFor="CIN">CIN </label>
                                        <input type="text" id="CIN" name="CIN" placeholder="Saisir le numéro CIN" value={formData.CIN} onChange={handleChange} required />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="Date_Embauche">Date D'embauche</label>
                                        <input type="date" id="Date_Embauche" name="Date_Embauche" value={formData.Date_Embauche} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-item">
                                        <label htmlFor="Service">Service</label>
                                        <select id="Service" name="Service" value={formData.Service} onChange={handleChange} required>
                                            <option value="">Sélectionner un service</option>
                                            <option value="Direction Générale">Direction Générale</option>
                                            <option value="Direction Technique">Direction Technique</option>
                                            <option value="Études et Méthodes">Études et Méthodes</option>
                                            <option value="Service Informatique">Service Informatique</option>
                                            <option value="Service Mécanique / Parc Matériel">Service Mécanique / Parc Matériel</option>
                                            <option value="Service Comptabilité et Finances">Service Comptabilité et Finances</option>
                                            <option value="Service Ressources Humaines">Service Ressources Humaines</option>
                                            <option value="Service Juridique">Service Juridique</option>
                                            <option value="Service Achats et Approvisionnements">Service Achats et Approvisionnements</option>
                                            <option value="Service Qualité, Sécurité et Environnement (QSE)">Service Qualité, Sécurité et Environnement (QSE)</option>
                                            <option value="Service Marketing & Communication">Service Marketing & Communication</option>
                                            <option value="Service de Maintenance">Service de Maintenance</option>
                                            <option value="Service Logistique">Service Logistique</option>
                                            <option value="Service Travaux / Chantiers">Service Travaux / Chantiers</option>
                                            <option value="Service Architecture & Conception">Service Architecture & Conception</option>
                                        </select>

                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="Image_Intervenant">Image de l'intervenant</label>
                                        <input type="file" id="Image_Intervenant" name="Image_Intervenant" style={{ display: 'none' }} onChange={handleChange} />
                                        <label htmlFor="Image_Intervenant" className="label_image">
                                            <div className="input_image">
                                                <span>Image (optionnel)</span>
                                                <span><IoImageOutline /></span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-item">
                                        <label htmlFor="Type_Fichier">Type du fichier</label>
                                        <select id="Type_Fichier" name="Type_Fichier" value={formData.Type_Fichier} onChange={handleChange} required>
                                            <option value="" >Sélectionner type du fichier</option>
                                            <option value="CV">CV</option>
                                            <option value="Lettre de motivation">Lettre de motivation</option>
                                            <option value="Certificat">Certificat</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="Fichier_intervenant">Choisir un fichier</label>
                                        <input type="file" id="Fichier_intervenant" name="Fichier_intervenant" style={{ display: 'none' }} onChange={handleChange} />
                                        <label htmlFor="Fichier_intervenant" className="label_image">
                                            <div className="input_image">
                                                <span>Télécharger le fichier</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button type="submit" className="btn_submit">Mettre à jour</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modifierintervenant;



