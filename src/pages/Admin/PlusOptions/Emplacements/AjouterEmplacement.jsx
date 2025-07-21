import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import Header from "../../../../components/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClent from "../../../../Api/AxiosClent";

function AjouterEmplacement() {
    const [formData, setFormData] = useState({
        nom_emplacement: "",
        address: "",
        latitude: "",
        longitude: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClent.post("/emplacements", formData);
            setFormData({
                nom_emplacement: "",
                address: "",
                latitude: "",
                longitude: "",
                description: "",
            });
            toast.success("Emplacement ajouté avec succès");

            setTimeout(() => {
                window.location.href = "/admin/PlusOptions/emplacements/";
            }, 2500); 
        } catch (err) {
            console.error("Erreur lors de la requête :", err);
            toast.error("Erreur lors de l'ajout de l'emplacement !");
        }
    };

    const Retour = () => {
        window.history.back();
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className='container'>
                <div className='container_header'>
                    <div className='container_header_right'>
                        <h1 className='container_title'>Ajouter un emplacement</h1>
                        <p className='container_subtitle'>Complétez le formulaire pour ajouter un emplacement au système SGTM.</p>
                        <span className="retour" onClick={Retour}><FaChevronLeft /> retour</span>
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
        </>
    );
}

export default AjouterEmplacement;
