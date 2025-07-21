import { FaList } from "react-icons/fa";
import Header from '../../../components/Header';
import { Link } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import FetchEmplacements from "../../../components/FetchEmplacements";


function AjouterEquipement() {
    // -------------------function de retour----------------->
    const Retour = () => {
        window.history.back();
    }




    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState('');
    const [etape, setEtape] = useState(1);
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (e.target.type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const nextEtape = (e) => {
        e.preventDefault();
        if (etape === 1) {
            const requiredInputs = [
                'Code_Equipement',
                'Categorie_Equipement',

            ];


            const isValid = requiredInputs.every((field) => {
                const value = formData[field];
                return value !== undefined && value !== null && value.toString().trim() !== '';
            });
            if (!isValid) {
                setErreur('Veuillez remplir tous les champs obligatoires');
            }
            else {
                setEtape(etape + 1);
                setErreur('');
            }

        }
    };

    const precedant = () => {
        setEtape(etape - 1);
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
                        <h1 className='container_title'>Ajouter un équipement</h1>
                        <p className='container_subtitle'>Complétez le formulaire pour ajouter un équipement au système SGTM.</p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
                    </div>
                    <div className='container_header_left'>
                        
                    </div>
                </div>

                <div className="container_content">
                    <div className="container_formulaire">
                        <form onSubmit={handleSubmit}>

                            {/* --------------message erreur--------------- */}
                            {erreur && <p className="form-error">{erreur}</p>}

                            {/* --------------partie 1 de formulaire--------------- */}

                            {etape === 1 && (
                                <div className="first_partie_form">
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="Code_Equipement">Code l'équipement </label>
                                            <input type="number" id="Code_Equipement" name="Code_Equipement" placeholder="Saisir le Code Equipement" value={formData.Code_Equipement || ''} onChange={handleChange} required />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Categorie_Equipement">Catégorie Equipement  </label>
                                            <select id="Categorie_Equipement" name="Categorie_Equipement" value={formData.Categorie_Equipement || ''} onChange={handleChange} required>
                                                <option value="">Toutes les catégories</option>
                                                <option value="terrassement">Engins de terrassement</option>
                                                <option value="levage">Matériel de levage</option>
                                                <option value="coffrage">Équipements de coffrage et étaiement</option>
                                                <option value="compactage">Matériel de compactage</option>
                                                <option value="transport">Équipements de transport</option>
                                                <option value="forage">Matériel de forage et d’injection</option>
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
                                            <label htmlFor="N_Serie">N° Série </label>
                                            <input type="text" id="N_Serie" name="N_Serie" placeholder="Saisir le N° série" value={formData.N_Serie || ''} onChange={handleChange} required />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Compteur">Compteur </label>
                                            <input type="text" id="Compteur" name="Compteur" placeholder="Valeur compteur" value={formData.Compteur || ''} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="Type_Moteur">Type de Moteur </label>
                                            <input type="text" id="Type_Moteur" name="Type_Moteur" placeholder="Type de moteur" value={formData.Type_Moteur || ''} onChange={handleChange} />
                                        </div>
                                        <FetchEmplacements handleChange formData />

                                    </div>
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="matricule">matricule</label>
                                            <input type="text" id="matricule" name="matricule" placeholder="Saisir matricule" value={formData.matricule || ''} onChange={handleChange} required />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Modele_Equipement">Modèle de l'équipement </label>
                                            <input type="text" id="Modele_Equipement" name="Modele_Equipement" placeholder="Saisir le modèle" value={formData.Modele_Equipement || ''} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        
                                    <div className="form-item">
                                            <label htmlFor="Marque">Marque </label>
                                            <input type="text" id="Marque" name="Marque" placeholder="Marque" value={formData.Marque || ''} onChange={handleChange} />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Image_Emplacement">Image de l'équipement</label>
                                            <input type="file" id="Image_Emplacement" name="Image_Emplacement" style={{ display: 'none' }} onChange={handleChange} />
                                            <label htmlFor="Image_Emplacement" className="label_image">
                                                <div className="input_image">
                                                    <span>Image (optionnel)</span>
                                                    <span><IoImageOutline /></span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-button">
                                        <button className="btn_submit" onClick={nextEtape}>Suivant</button>
                                    </div>
                                </div>
                            )}

                            {/* --------------partie 2 de formulaire--------------- */}

                            {etape === 2 && (
                                <div className="secand_partie_form">
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="Responsable">Opérateur</label>
                                            <input type="text" id="Operateur" name="Operateur" placeholder="Saisir nom Opérateur" value={formData.Operateur || ''} onChange={handleChange} />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Fin_Garantie">Date Fin de garantie</label>
                                            <input type="date" id="Fin_Garantie" name="Fin_Garantie" value={formData.Fin_Garantie || ''} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="Prix_Acquisition">Prix d'acquisition</label>
                                            <input type="text" id="Prix_Acquisition" name="Prix_Acquisition" placeholder="Saisir le prix d'acquisition" value={formData.responsable || ''} onChange={handleChange} />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Date_Acquisition">Date d'acquisition </label>
                                            <input type="date" id="Date_Acquisition" name="Date_Acquisition" value={formData.Date_Acquisition || ''} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="Prix_Location">Prix de location</label>
                                            <input type="text" id="Prix_Location" name="Prix_Location" placeholder="Saisir le prix de location" value={formData.Prix_Location || ''} onChange={handleChange} />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Prochaine_Vidange ">Prochaine Vidange </label>
                                            <input type="date" id="Prochaine_Vidange" name="Prochaine_Vidange" value={formData.Prochaine_Vidange || ''} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="Nom_Fichier">Nom de fichier</label>
                                            <input type="text" id="Nom_Fichier" name="Nom_Fichier" placeholder="Saisir le nom de fichier" value={formData.Nom_Fichier || ''} onChange={handleChange} />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="Fichier_file">Choisir un fichier</label>
                                            <input type="file" id="Fichier_file" name="Fichier_file" value={formData.Fichier_file || ''} onChange={handleChange} style={{ display: 'none' }} />
                                            <label htmlFor="Fichier_file" className="label_image">
                                                <div className="input_image">
                                                    <span>Télecharger le fichier</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-item">
                                            <label htmlFor="Commentaire">Commentaire</label>
                                            <textarea name="Commentaire" id="Commentaire" placeholder="Commentaire..." value={formData.Commentaire || ''} onChange={handleChange}></textarea>
                                        </div>
                                        <div className="form-item">

                                        </div>
                                    </div>

                                    <div className="form-button">
                                        <button type="button" className="btn_annuler" onClick={precedant}>Retour</button>
                                        <button type="submit" className="btn_submit">Soumettre</button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AjouterEquipement;