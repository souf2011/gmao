import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import '../styles/pagination.css';

const Pagination = ({ currentPage, totalPages, paginate, totalItems, maxRows }) => {
    if (totalPages === 0) return null;

    const debut = (currentPage - 1) * maxRows + 1;
    const fin = Math.min(currentPage * maxRows, totalItems);

    return (
        <div className="pagination">
            <div className="showing-items">
                Affichage <span className="items-count">{debut}-{fin}</span> sur <span className="total-items">{totalItems}</span>
            </div>

            <div className="btn_pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    <FaChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
