import React, { useState } from 'react';
import { FaChevronLeft, FaPlus } from 'react-icons/fa6';
import Header from '../../../../components/Header';

function AjouterDemandeApprovisionnement() {
    const [formData, setFormData] = useState({
        qte: '',
        unite: '',
        reference: '',
        designation: '',
        numeroDA: '',
        statut: '',
        bc: '',
    });
    const handleRetour = () => {
        window.history.back();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Demande enregistrée:', formData);
    };

    return (
        <>
            <Header />
            <div className="container_header_cat">
                <div className="container_header_right">
                    <h1 className="container_title">Ajouter un demande d'approvisionnement</h1>
                    <p className="container_subtitle">
                        complétez le formulaire pour ajouter un demande d'approvisonnement d'un intervention
                    </p>
                    <span className="retour" onClick={handleRetour}>   <FaChevronLeft /> retour</span>


                </div>

            </div>

            <form className="form_container" onSubmit={handleSubmit}>
                <table className="form_table">
                    <thead>
                        <tr>
                            <th>QTE</th>
                            <th>UNITÉ</th>
                            <th>RÉFÉRENCE</th>
                            <th>DÉSIGNATION</th>
                            <th>N° D.A</th>
                            <th>STATUT</th>
                            <th>BC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="number"
                                    name="qte"
                                    placeholder="QTE"
                                    value={formData.qte}
                                    onChange={handleChange}
                                    className="input_field"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="unite"
                                    placeholder="UNITÉ"
                                    value={formData.unite}
                                    onChange={handleChange}
                                    className="input_field"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="reference"
                                    placeholder="RÉF"
                                    value={formData.reference}
                                    onChange={handleChange}
                                    className="input_field"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="designation"
                                    placeholder="DÉSIGN"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="input_field"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="nda"
                                    placeholder="N° D.A"
                                    value={formData.numeroDA}
                                    onChange={handleChange}
                                    className="input_field"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="statut"
                                    placeholder="STATUT"
                                    value={formData.statut}
                                    onChange={handleChange}
                                    className="input_field"

                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="bc"
                                    placeholder="BC"
                                    value={formData.bc}
                                    onChange={handleChange}
                                    className="input_field"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="form_buttons">
                    <button type="button" className="btn_ajouter">
                        <FaPlus />
                        Ajouter
                    </button>

                    <button type="submit" className="btn_enregistrer">
                        Enregistrer Demande
                    </button>
                </div>
            </form>
        </>
    );
}

export default AjouterDemandeApprovisionnement;  