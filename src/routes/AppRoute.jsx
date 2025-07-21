import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import Equipements from '../pages/Admin/Equipements/ListeEquipements';
import AjouterEquipement from '../pages/Admin/Equipements/AjouterEquipement';
import Intervenants from '../pages/Admin/Intervenants/ListeIntervenants';
import Interventions from '../pages/Admin/Interventions/ListeInterventions';
import ListeCatégories from '../pages/Admin/PlusOptions/catégorie/ListeCatégories';
import AjouterCatégorie from '../pages/Admin/PlusOptions/catégorie/AjouterCatégorie';
import DétailCatégorie from '../pages/Admin/PlusOptions/catégorie/DétailCatégorie';
import ModifierCategorie from '../pages/Admin/PlusOptions/catégorie/ModifierCatégorie';
import DemandeIntervention from '../pages/Admin/Interventions/DemandeIntervention';


// ------------------utilisateur routes ------------>
// import UserLayout from '../layouts/UserLayout';
// import Home from '../pages/user/Home';
// import EquipementsList from '../pages/user/EquipementsList';
// import DemandeIntervention from '../pages/user/DemandeIntervention';

// ------------------autres routes ------------>
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import AjouterIntervenant from '../pages/Admin/Intervenants/AjouterIntervenant';
import ProfileIntervenant from '../pages/Admin/Intervenants/ProfileIntervenant';

import Test from '../pages/Test';
import Modifierintervenant from '../pages/Admin/Intervenants/Modifierintervenant';
import ModifierEquipement from '../pages/Admin/Equipements/ModifierEquipement';
import DetailEquipement from '../pages/Admin/Equipements/DetailEquipement';
import PlusDetails from '../pages/Admin/Equipements/PlusDetails';
import DetailIntervention from '../pages/Admin/Interventions/DetailIntervention';
import SuiviTravaux from '../pages/Admin/Interventions/SuiviTravaux';
import ListeDemandeApprovisionnement from '../pages/Admin/Interventions/DemandeApprovisionnement/ListeDemandeApprovisionnement';
import AjouterDemandeApprovisionnement from '../pages/Admin/Interventions/DemandeApprovisionnement/AjouterDemandeApprovisionnement';
import ModifierIntervention from '../pages/Admin/Interventions/ModifierIntervention';
import ModifierSuiviTravaux from '../pages/Admin/Interventions/ModifierSuiviTravaux';
import ModifierDA from '../pages/Admin/Interventions/DemandeApprovisionnement/ModifierDA';
import ListsEmplacements from '../pages/Admin/PlusOptions/Emplacements/ListsEmplacements';
import ModifierEmplacements from '../pages/Admin/PlusOptions/Emplacements/ModifierEmplacements';
import DétailEmplacement from '../pages/Admin/PlusOptions/Emplacements/DétailEmplacement';
import AjouterEmplacement from '../pages/Admin/PlusOptions/Emplacements/AjouterEmplacement';
function AppRoute() {
    return (
        <Routes>
            {/* ------------------Partie Routes de admin------------------- */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="equipements" element={<Equipements />} />
                <Route path="equipements/AjouterEquipement" element={<AjouterEquipement />} />
                <Route path="equipements/ModifierEquipement/:id" element={<ModifierEquipement />} />
                <Route path="equipements/DetailEquipement/:id" element={<DetailEquipement />} />
                <Route path="equipements/PlusDetails/:id" element={<PlusDetails />} />



                {/* -------------------------PlusOptions------------------------------ */}
                {/* ----------categorie------------ */}
                <Route path="PlusOptions/catégorie/" element={<ListeCatégories />} />
                <Route path="PlusOptions/catégorie/AjouterCatégorie" element={<AjouterCatégorie />} />
                <Route path="PlusOptions/catégorie/:id" element={<DétailCatégorie />} />
                <Route path="PlusOptions/catégorie/Modifier/:id" element={<ModifierCategorie />} />
                {/* --------------emplacements------------ */}
                <Route path="PlusOptions/emplacements/" element={<ListsEmplacements />} />
                <Route path="PlusOptions/emplacements/AjouterEmplacement" element={<AjouterEmplacement />} />
                <Route path="PlusOptions/emplacements/ModifierEmplacement/:id" element={<ModifierEmplacements />} />
                <Route path="PlusOptions/emplacements/:id" element={<DétailEmplacement />} />

                {/* ------------------interventions------------------ */}
                <Route path="interventions" element={<Interventions />} />
                <Route path="interventions/DemandeIntervention" element={<DemandeIntervention />} />
                <Route path="interventions/:id" element={<DetailIntervention />} />
                <Route path="interventions/ModifierIntervention/:id" element={<ModifierIntervention />} />
                <Route path="interventions/suiviTravaux" element={<SuiviTravaux />} />
                <Route path="interventions/ModifierSuiviTravaux/:id" element={<ModifierSuiviTravaux />} />
                <Route path="interventions/DemandeApprovisionnement" element={<ListeDemandeApprovisionnement />} />
                <Route path="interventions/DemandeApprovisionnement/ModifierDA/:id" element={<ModifierDA />} />
                <Route path="interventions/DemandeApprovisionnement/AjouterDemandeApprovisionnement" element={<AjouterDemandeApprovisionnement />} />
                {/* ------------------Intervenant------------------ */}
                < Route path="intervenants" element={<Intervenants />} />
                <Route path="intervenants/AjouterIntervenant" element={<AjouterIntervenant />} />
                <Route path="intervenants/Modifierintervenant/:id" element={<Modifierintervenant />} />
                <Route path="intervenants/Intervenant/:id" element={<ProfileIntervenant />} />

                {/* <Route path="test" element={<AjouterDemandeApprovisionnement />} /> */}
            </Route >
            <Route path="test" element={<Test />} />



            {/* ------------------Partie Routes de utilisateur------------------- */}

            {/* <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="equipements" element={<EquipementsList />} />
                <Route path="demande-intervention" element={<DemandeIntervention />} />
            </Route> */}


            {/* ------------------Partie Routes de Autres------------------- */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes >
    )
}

export default AppRoute;
