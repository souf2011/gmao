import { FaChevronLeft } from "react-icons/fa";
import Header from "../../../components/Header";
import { IoImageOutline } from "react-icons/io5";
import { useState } from "react";

function DemandeIntervention() {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis avec les données suivantes :", formData);
    alert("Formulaire soumis (simulation) !");
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
            <h1 className="container_title">Demande d'Intervention</h1>
            <p className="container_subtitle">
              Complétez le formulaire pour demander une intervention au système SGTM.
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
                    placeholder="Saisir Description Panne"
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
                    <option value="">Sélectionner la priorite</option>
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
                    placeholder="Saisir Demandeur"
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
                  <label htmlFor="file">File de Intervention (optionnel)</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                  />
                  <label htmlFor="file" className="label_image">
                    <div className="input_image">
                      <span>File de Intervention (optionnel)</span>
                      <span><IoImageOutline /></span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-button">
                <button type="submit" className="btn_submit">
                  Enregistrer 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DemandeIntervention;