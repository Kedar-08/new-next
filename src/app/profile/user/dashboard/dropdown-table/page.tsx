"use client";

import React, { useState } from "react";
import CustomDataTable from "@/components/shared/datatable/CustomDataTable";
import TextInputField from "@/components/shared/textinput/TextInputField";
import GlobalDropdown from "@/components/shared/dropdown/GlobalDropdown";
import { Stack } from "@carbon/react";
import styles from "./dropdownpage.module.scss";
import FileInput from "@/components/shared/fileinput/FileInput";

const headers = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];

interface TableRowData {
  id: string;
  name: string;
  status: string;
}

const tableData: Record<string, TableRowData[]> = {
  "Table 1": [
    { id: "1", name: "Item A", status: "Active" },
    { id: "2", name: "Item B", status: "Inactive" },
  ],
  "Table 2": [
    { id: "3", name: "Item C", status: "Pending" },
    { id: "4", name: "Item D", status: "Active" },
  ],
  "Table 3": [
    { id: "5", name: "Item E", status: "Inactive" },
    { id: "6", name: "Item F", status: "Pending" },
  ],
};

const NewPage = () => {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [rows, setRows] = useState<TableRowData[]>([]);
  const [textInput, setTextInput] = useState<string>("");

  // Define form values state
  const [formValues, setFormValues] = useState({
    fileName: "",
  });

  // Handle input field changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Handle table selection from dropdown
  const handleTableChange = (selectedItem: string | null) => {
    if (selectedItem === "None") {
      setSelectedTable("");
      setRows([]);
    } else {
      setSelectedTable(selectedItem ?? ""); // Using nullish coalescing operator
      setRows(selectedItem ? tableData[selectedItem] : []);
    }
  };

  // Function to add new row dynamically
  const handleAddRow = () => {
    const newRow: TableRowData = {
      id: (rows.length + 1).toString(),
      name: `Item ${String.fromCharCode(65 + rows.length)}`,
      status: "Active",
    };
    setRows([...rows, newRow]);
  };

  return (
    <main className={styles["new-page-container"]}>
      <Stack gap={5}>
        {/* File Input Field */}
        <div className={styles.fileInputContainer}>
          <FileInput
            id="fileInput"
            labelText="Select a file"
            placeholder="No file chosen"
            value={formValues.fileName}
            onChange={(fileName) => handleChange("fileName", fileName)}
          />
        </div>

        <TextInputField
          id="textInput"
          name="textInput"
          labelText="Enter Text"
          placeholder="Type something..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onBlur={() => {}}
        />

        {/* Dropdown to Select Table */}
        <GlobalDropdown
          id="tableDropdown"
          titleText="Select Table"
          label="Choose a table"
          items={["None", ...Object.keys(tableData)]} // Add "None" as an option
          selectedItem={selectedTable}
          onChange={handleTableChange}
        />

        {/* Show Table Based on Selection */}
        {selectedTable && (
          <div className={styles["table-container"]}>
            <CustomDataTable
              headers={headers}
              rows={rows}
              onAddRow={handleAddRow}
              onDeleteRows={(selectedRows) =>
                setRows(
                  rows.filter(
                    (row) => !selectedRows.some((sel) => sel.id === row.id)
                  )
                )
              }
            />
          </div>
        )}
      </Stack>
    </main>
  );
};

export default NewPage;
