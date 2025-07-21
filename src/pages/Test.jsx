import React, { useState, useEffect } from 'react';

function Test({ filterOptions, data, onFilterChange }) {
    const [selectedType, setSelectedType] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    // استخراج القيم الممكنة بناءً على النوع المختار
    const getUniqueValues = (type) => {
        const values = data.map(item => item[type]).filter(Boolean);
        return [...new Set(values)];
    };

    useEffect(() => {
        // إذا غيّر المستخدم نوع الفلتر، نعيد تعيين القيمة
        setSelectedValue('');
        onFilterChange('', '');
    }, [selectedType]);

    useEffect(() => {
        // نرسل النوع والقيمة المختارة للمكون الأب
        onFilterChange(selectedType, selectedValue);
    }, [selectedValue]);

    return (
        <div className="select_filter_table">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">نوع الفلتر</option>
                {filterOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>

            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} disabled={!selectedType}>
                <option value="">اختر القيمة</option>
                {selectedType && getUniqueValues(selectedType).map((val, index) => (
                    <option key={index} value={val}>{val}</option>
                ))}
            </select>
        </div>
    );
}

export default Test;
