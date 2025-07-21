import { useState, useMemo } from 'react';

const FiltragePagination = (data, maxRows = 4) => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'

    const handleFilterChange = (type, value, sort = '') => {
        if (type === 'Nom') {
            setSearchQuery(value);
            setSelectedType('');
            setSelectedValue('');
            setSortOrder('');
        } else if (type === 'Trier') {
            setSortOrder(sort);
        } else {
            setSelectedType(type);
            setSelectedValue(value);
            setSearchQuery('');
            setSortOrder('');
        }
        setCurrentPage(1);
    };






    const filteredData = useMemo(() => {
        let filtered = data;

        if (selectedType && selectedValue) {
            filtered = filtered.filter(item =>
                item[selectedType]?.toString().toLowerCase() === selectedValue.toLowerCase()
            );
        }

        if (searchQuery) {
            filtered = filtered.filter(item =>
                Object.values(item).some(val =>
                    val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
        if (sortOrder === 'asc') {
            filtered = [...filtered].sort((a, b) => (a.Compteur ?? 0) - (b.Compteur ?? 0));
        } else if (sortOrder === 'desc') {
            filtered = [...filtered].sort((a, b) => (b.Compteur ?? 0) - (a.Compteur ?? 0));
        }

        return filtered;
    }, [data, selectedType, selectedValue, searchQuery,sortOrder]);

    const totalPages = Math.ceil(filteredData.length / maxRows);
    const lastIndex = currentPage * maxRows;
    const firstIndex = lastIndex - maxRows;
    const lignesAffichees = filteredData.slice(firstIndex, lastIndex);

    return {
        selectedType,
        selectedValue,
        searchQuery,
        handleFilterChange,
        currentPage,
        setCurrentPage,
        totalPages,
        lignesAffichees,
        filteredData,
        maxRows
    };
};

export default FiltragePagination;
