import React from 'react';

const ConfirmationDelete = ({ affiche, onConfirm, onCancel }) => {
    if (!affiche) return null;

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal">
                <div className="modal-header">
                    <h3>Confirmer la suppression</h3>
                </div>
                <div className="modal-body">
                    <p>Voulez-vous vraiment supprimer  ?</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onCancel} className="btn_edit">Annuler</button>
                    <button onClick={onConfirm} className="btn_delete">Oui, supprimer !</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDelete;
