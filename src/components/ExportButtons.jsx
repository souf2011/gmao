import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportButtons = ({ data, fileName = "export", columns = null }) => {
    const exportToExcel = () => {
        const filteredData = columns
            ? data.map(row => {
                let filtered = {};
                columns.forEach(col => filtered[col] = row[col]);
                return filtered;
            })
            : data;

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `${fileName}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        if (data.length === 0) return;

        const cols = columns || Object.keys(data[0]);
        const rows = data.map(obj => cols.map(col => obj[col]));

        autoTable(doc, {
            head: [cols],
            body: rows,
            startY: 20,
        });

        doc.text(`Export: ${fileName}`, 14, 15);
        doc.save(`${fileName}.pdf`);
    };

    const handleExportChange = (e) => {
        const value = e.target.value;
        if (value === "excel") exportToExcel();
        else if (value === "pdf") exportToPDF();
    };

    return (
        <div className="select_filter_table" style={{ marginBottom: "1rem" }}>
            <select onChange={handleExportChange} className="btn_link">
                <option value="">Exporter</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
            </select>
        </div>
    );
};

export default ExportButtons;
