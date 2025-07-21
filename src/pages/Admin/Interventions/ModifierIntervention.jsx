import { FaChevronLeft } from "react-icons/fa";
import Header from "../../../components/Header";
import { IoImageOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ModifierIntervention() {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        equipement: "",
        descriptionPanne: "",
        emplacement: "",
        type: "",
        priorite: "",
        demandeur: "",
        etat: "",
        file: null,
    });

    useEffect(() => {
        
        fetch('http://localhost:4000/interventions')
            .then((response) => response.json())
            .then((data) => {
                const intervention = data.find(item => item.id === id);  
                if (intervention) {
                    setFormData({
                        equipement: intervention.equipement || "",
                        descriptionPanne: intervention.description || "",
                        emplacement: intervention.emplacement || "",
                        type: intervention.type || "",
                        priorite: intervention.priorite || "",
                        demandeur: intervention.demandeur || "",
                        etat: intervention.etat || "",
                        file: null,  
                    });
                }
            })
            .catch((error) => console.error("Erreur lors de la récupération des données:", error));
    }, [id]);  

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Modification soumise avec les données suivantes :", formData);
        
    };

    const Retour = () => {
        window.history.back();
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="container_header">
                    <div className="container_header_right">
                        <h1 className="container_title">Modifier une intervention</h1>
                        <p className="container_subtitle">
                            Modifiez les informations de l'intervention dans le système SGTM.
                        </p>
                        <span className="retour" onClick={Retour}>
                            <FaChevronLeft /> retour
                        </span>
                    </div>
                </div>

                <div className="container_content">
                    <div className="container_formulaire">
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="equipement">Equipement</label>
                                    <select
                                        id="equipement"
                                        name="equipement"
                                        value={formData.equipement}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionner l'Equipement</option>
                                        <option value="equipement1">61335 - American terex HC 210</option>
                                        <option value="equipement2">Equipement 2</option>
                                    </select>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="descriptionPanne">Description Panne</label>
                                    <input
                                        type="text"
                                        id="descriptionPanne"
                                        name="descriptionPanne"
                                        placeholder="Modifier la Description Panne"
                                        value={formData.descriptionPanne}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="emplacement">Emplacement</label>
                                    <select
                                        id="emplacement"
                                        name="emplacement"
                                        value={formData.emplacement}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionner Emplacement</option>
                                        <option value="emplacement1">Viaduc Sakia El Hamra / Travaux pieux & palplanches</option>
                                        <option value="emplacement2">Emplacement 2</option>
                                    </select>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="type">Type</label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionner Type</option>
                                        <option value="type1">Type 1</option>
                                        <option value="type2">Type 2</option>
                                    </select>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="priorite">Priorité</label>
                                    <select
                                        id="priorite"
                                        name="priorite"
                                        value={formData.priorite}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionner la Priorité</option>
                                        <option value="haute">Haute</option>
                                        <option value="moyenne">Moyenne</option>
                                        <option value="basse">Basse</option>
                                    </select>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="demandeur">Demandeur</label>
                                    <input
                                        type="text"
                                        id="demandeur"
                                        name="demandeur"
                                        placeholder="Modifier le Demandeur"
                                        value={formData.demandeur}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="etat">Etat</label>
                                    <select
                                        id="etat"
                                        name="etat"
                                        value={formData.etat}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionner l'Etat</option>
                                        <option value="nouveau">Marche</option>
                                        <option value="en_cours">Marche</option>
                                        <option value="termine">Marche</option>
                                    </select>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="file">Fichier de l'Intervention (optionnel)</label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="file" className="label_image">
                                        <div className="input_image">
                                            <span>Choisir un fichier</span>
                                            <span><IoImageOutline /></span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="form-button">
                                <button type="submit" className="btn_submit">
                                    Enregistrer les modifications
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModifierIntervention;
