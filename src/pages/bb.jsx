import React, { useEffect, useState } from 'react';
import axiosClent from '../../../api/axiosClent';

function ListeEquipementsSimple() {
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClent.get('/equipements');
        setEquipements(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Liste des équipements</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {equipements.length > 0 ? (
              equipements.map((eq) => (
                <tr key={eq.id}>
                  <td>{eq.Nom_Equipement}</td>
                  <td>{eq.categories?.categorie_name || "Non défini"}</td>
                  <td>{eq.Status}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">Aucun équipement trouvé.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListeEquipementsSimple;
