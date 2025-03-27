"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GlobalHeader from "@/components/Header";
import CustomDataTable from "@/components/shared/datatable/CustomDataTable";

// Table Headers
const headers = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];

const ArchiveTable = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([
    { id: "1", name: "Item 1", status: "Active" },
    { id: "2", name: "Item 2", status: "Inactive" },
    { id: "3", name: "Item 3", status: "Pending" },
  ]);

  // Function to add a new row
  const addNewRow = () => {
    const newRow = {
      id: (rows.length + 1).toString(),
      name: `Item ${rows.length + 1}`,
      status: "Active",
    };
    setRows([...rows, newRow]);
  };

  // Function to delete selected rows
  const deleteSelectedRows = (selectedRows: { id: string }[]) => {
    const selectedIds = selectedRows.map((row) => row.id);
    setRows((prevRows) =>
      prevRows.filter((row) => !selectedIds.includes(row.id))
    );
  };

  return (
    <>
      <GlobalHeader />
      <main style={{ padding: "2rem", marginTop: "3rem" }}>
        <h2 style={{ marginBottom: "2rem" }}>{t("archive.table.title")}</h2>
        <CustomDataTable
          headers={headers}
          rows={rows}
          onAddRow={addNewRow}
          onDeleteRows={deleteSelectedRows}
        />
      </main>
    </>
  );
};

export default ArchiveTable;
