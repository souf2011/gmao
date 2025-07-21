import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Search({ onSearchChange }) {
    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        onSearchChange(searchValue.trim() === '' ? '' : searchValue);
    };

    return (
        <div className="filter_table">
            <div className="search">
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Rechercher un...    "
                    className="search_input"
                    onChange={handleSearchChange}
                />
                <label htmlFor="search" className="search_label">
                    <FaSearch className="search_icon" />
                </label>
            </div>
        </div>

    );
}

export default Search;
