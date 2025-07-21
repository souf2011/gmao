import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

function FilterTable({ filterOptions, data, onFilterChange }) {
    const [selectedType, setSelectedType] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const getUniqueValues = (type) => {
        const values = data.map(item => item[type]).filter(Boolean);
        return [...new Set(values)];
    };

    useEffect(() => {
        setSelectedValue('');
        onFilterChange('', '', sortOrder); // clear value filter, preserve sort order
    }, [selectedType]);

    useEffect(() => {
        if (selectedType && selectedValue) {
            onFilterChange(selectedType, selectedValue, sortOrder);
        }
    }, [selectedValue]);

    useEffect(() => {
        // Apply sort even if no filters are selected
        onFilterChange(selectedType, selectedValue, sortOrder);
    }, [sortOrder]);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        if (searchValue.trim() === '') {
            onFilterChange('', '', sortOrder);
        } else {
            onFilterChange('Nom', searchValue, sortOrder);
        }
    };

    return (
        <div className="filter_table">
            <div className="search">
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Rechercher"
                    className="search_input"
                    onChange={handleSearchChange}
                />
                <label htmlFor="search" className="search_label">
                    <FaSearch className="search_icon" />
                </label>
            </div>

            <div className="select_filter_table">
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="">Type Filtrage</option>
                    {filterOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className="select_filter_table">
                <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    disabled={!selectedType}
                >
                    <option value="">Choisir valeur</option>
                    {selectedType && getUniqueValues(selectedType).map((val, index) => (
                        <option key={index} value={val}>{val}</option>
                    ))}
                </select>
            </div>

        </div>
    );
}

export default FilterTable;
