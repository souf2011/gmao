import { FaChevronLeft } from "react-icons/fa";
import Header from '../../../components/Header';
import { IoImageOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import FetchEmplacements from "../../../components/FetchEmplacements";
import { useParams } from "react-router-dom";
import axios from "axios";

function ModifierEquipement() {
    const handleRetour = () => {
        window.history.back();
    }

    const { id } = useParams();
    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState('');
    const [formData, setFormData] = useState({
        Code_Equipement: '',
        Categorie_Equipement: '',
        N_Serie: '',
        Compteur: '',
        Type_Moteur: '',
        matricule: '',
        Modele_Equipement: '',
        Operateur: '',
        Fin_Garantie: '',
        Prix_Acquisition: '',
        Date_Acquisition: '',
        Prix_Location: '',
        Prochaine_Vidange: '',
        Nom_Fichier: '',
        Commentaire: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/equipements/${id}`);
                const elm = response.data;

                if (elm) {
                    setFormData({
                        Code_Equipement: elm.Code_Equipement || '',
                        Categorie_Equipement: elm.Categorie_Equipement || '',
                        N_Serie: elm.N_Serie || '',
                        Compteur: elm.Compteur || '',
                        Type_Moteur: elm.Type_Moteur || '',
                        matricule: elm.matricule || '',
                        Modele_Equipement: elm.Modele_Equipement || '',
                        Operateur: elm.Operateur || '',
                        Fin_Garantie: elm.Fin_Garantie || '',
                        Prix_Acquisition: elm.Prix_Acquisition || '',
                        Date_Acquisition: elm.Date_Acquisition || '',
                        Prix_Location: elm.Prix_Location || '',
                        Prochaine_Vidange: elm.Prochaine_Vidange || '',
                        Nom_Fichier: elm.Nom_Fichier || '',
                        Commentaire: elm.Commentaire || ''
                    });
                } else {
                    setErreur('Équipement non trouvé');
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
        if (e.target.type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/equipements/${id}`, formData);
            setSucces('Équipement mis à jour avec succès!');
            setErreur('');
        } catch (err) {
            setErreur('Erreur lors de la mise à jour');
            setSucces('');
            console.error(err);
        }
    };


    return (
        <>
            <Header />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Modifier un équipement</h1>
                        <p className='container_subtitle'>Modifiez le formulaire pour mettre à jour un équipement dans le système SGTM.</p>
                        <span className="retour" onClick={handleRetour}><FaChevronLeft /> Retour</span>
                    </div>
                    <div className='container_header_left'></div>
                </div>

                <div className="container_content">
                    <div className="container_formulaire">
                        <form onSubmit={handleSubmit}>
                            {/* --------------message erreur et succès--------------- */}
                            {erreur && <p className="form-error">{erreur}</p>}
                            {succes && <p className="form-success">{succes}</p>}

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Code_Equipement">Code de l'équipement</label>
                                    <input
                                        type="text"
                                        id="Code_Equipement"
                                        name="Code_Equipement"
                                        placeholder="Saisir le Code Equipement"
                                        value={formData.Code_Equipement}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Categorie_Equipement">Catégorie Equipement</label>
                                    <select
                                        id="Categorie_Equipement"
                                        name="Categorie_Equipement"
                                        value={formData.Categorie_Equipement}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Toutes les catégories</option>
                                        <option value="terrassement">Engins de terrassement</option>
                                        <option value="levage">Matériel de levage</option>
                                        <option value="coffrage">Équipements de coffrage et étaiement</option>
                                        <option value="compactage">Matériel de compactage</option>
                                        <option value="transport">Équipements de transport</option>
                                        <option value="forage">Matériel de forage et d'injection</option>
                                        <option value="hydraulique">Équipements pour travaux hydrauliques</option>
                                        <option value="vrd">Matériel de voirie et réseaux divers (VRD)</option>
                                        <option value="securite">Équipements de sécurité et signalisation</option>
                                        <option value="outillage">Outillage électroportatif</option>
                                        <option value="energie">Groupes électrogènes et compresseurs</option>
                                        <option value="laboratoire">Matériel de laboratoire de chantier</option>
                                        <option value="maritime">Équipements pour travaux maritimes et fluviaux</option>
                                        <option value="chantier">Installations de chantier</option>
                                        <option value="autres">Autres équipements spécialisés</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="N_Serie">N° Série</label>
                                    <input
                                        type="text"
                                        id="N_Serie"
                                        name="N_Serie"
                                        placeholder="Saisir le N° série"
                                        value={formData.N_Serie}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Compteur">Compteur</label>
                                    <input
                                        type="text"
                                        id="Compteur"
                                        name="Compteur"
                                        placeholder="Valeur compteur"
                                        value={formData.Compteur}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Type_Moteur">Type de Moteur</label>
                                    <input
                                        type="text"
                                        id="Type_Moteur"
                                        name="Type_Moteur"
                                        placeholder="Type de moteur"
                                        value={formData.Type_Moteur}
                                        onChange={handleChange}
                                    />
                                </div>
                                <FetchEmplacements handleChange={handleChange} formData={formData} />
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="matricule">Matricule</label>
                                    <input
                                        type="text"
                                        id="matricule"
                                        name="matricule"
                                        placeholder="Saisir matricule"
                                        value={formData.matricule}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Modele_Equipement">Modèle de l'équipement</label>
                                    <input
                                        type="text"
                                        id="Modele_Equipement"
                                        name="Modele_Equipement"
                                        placeholder="Saisir le modèle"
                                        value={formData.Modele_Equipement}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Image_Emplacement">Image de l'équipement</label>
                                    <input
                                        type="file"
                                        id="Image_Emplacement"
                                        name="Image_Emplacement"
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="Image_Emplacement" className="label_image">
                                        <div className="input_image">
                                            <span>Image (optionnel)</span>
                                            <span><IoImageOutline /></span>
                                        </div>
                                    </label>
                                </div>
                                <div className="form-item"></div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Operateur">Opérateur</label>
                                    <input
                                        type="text"
                                        id="Operateur"
                                        name="Operateur"
                                        placeholder="Saisir nom Opérateur"
                                        value={formData.Operateur}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Fin_Garantie">Date Fin de garantie</label>
                                    <input
                                        type="date"
                                        id="Fin_Garantie"
                                        name="Fin_Garantie"
                                        value={formData.Fin_Garantie}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Prix_Acquisition">Prix d'acquisition</label>
                                    <input
                                        type="text"
                                        id="Prix_Acquisition"
                                        name="Prix_Acquisition"
                                        placeholder="Saisir le prix d'acquisition"
                                        value={formData.Prix_Acquisition}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Date_Acquisition">Date d'acquisition</label>
                                    <input
                                        type="date"
                                        id="Date_Acquisition"
                                        name="Date_Acquisition"
                                        value={formData.Date_Acquisition}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Prix_Location">Prix de location</label>
                                    <input
                                        type="text"
                                        id="Prix_Location"
                                        name="Prix_Location"
                                        placeholder="Saisir le prix de location"
                                        value={formData.Prix_Location}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Prochaine_Vidange">Prochaine Vidange</label>
                                    <input
                                        type="date"
                                        id="Prochaine_Vidange"
                                        name="Prochaine_Vidange"
                                        value={formData.Prochaine_Vidange}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Nom_Fichier">Nom de fichier</label>
                                    <input
                                        type="text"
                                        id="Nom_Fichier"
                                        name="Nom_Fichier"
                                        placeholder="Saisir le nom de fichier"
                                        value={formData.Nom_Fichier}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="Fichier_file">Choisir un fichier</label>
                                    <input
                                        type="file"
                                        id="Fichier_file"
                                        name="Fichier_file"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="Fichier_file" className="label_image">
                                        <div className="input_image">
                                            <span>Télécharger le fichier</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="Commentaire">Commentaire</label>
                                    <textarea
                                        name="Commentaire"
                                        id="Commentaire"
                                        placeholder="Commentaire..."
                                        value={formData.Commentaire}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="form-item"></div>
                            </div>

                            <div className="form-button">
                                <button type="submit" className="btn_submit">Mettre à jour</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModifierEquipement;