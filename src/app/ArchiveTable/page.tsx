"use client";
import React, { useState, ChangeEvent } from "react";
import GlobalHeader from "@/components/Header";
import {
  DataTable,
  TableContainer,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectAll,
  TableSelectRow,
  Button,
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@carbon/react";

import { TrashCan, Save, Download } from "@carbon/icons-react";

// Table Headers
const headers = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];

const ArchiveTable = () => {
  const [rows, setRows] = useState([
    { id: "1", name: "Item 1", status: "Active" },
    { id: "2", name: "Item 2", status: "Inactive" },
    { id: "3", name: "Item 3", status: "Pending" },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowsToDelete, setSelectedRowsToDelete] = useState<
    { id: string }[]
  >([]);

  // Function to add a new row
  const addNewRow = () => {
    const newRow = {
      id: (rows.length + 1).toString(),
      name: `Item ${rows.length + 1}`,
      status: "Active",
    };
    setRows([...rows, newRow]);
  };

  // Open delete confirmation modal
  const openDeleteModal = (selectedRows: { id: string }[]) => {
    setSelectedRowsToDelete(selectedRows);
    setIsDeleteModalOpen(true);
  };

  // Confirm and delete selected rows
  const confirmDelete = () => {
    const selectedIds = selectedRowsToDelete.map((row) => row.id);
    setRows((prevRows) =>
      prevRows.filter((row) => !selectedIds.includes(row.id))
    );
    setIsDeleteModalOpen(false); // Close modal after deleting
  };

  return (
    <>
      <GlobalHeader />
      <main style={{ padding: "2rem", marginTop: "3rem" }}>
        <h2 style={{ marginBottom: "2rem" }}>Archive Data Table</h2>

        <DataTable rows={rows} headers={headers}>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps,
          }) => {
            const batchActionProps = getBatchActionProps();
            return (
              <TableContainer
                title="Archive Data Table"
                description="A table with batch actions"
                {...getTableContainerProps()}
              >
                <TableToolbar>
                  <TableBatchActions {...batchActionProps}>
                    <TableBatchAction
                      renderIcon={TrashCan}
                      onClick={() => openDeleteModal(selectedRows)}
                    >
                      Delete
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Save}
                      onClick={() => console.log("Saved", selectedRows)}
                    >
                      Save
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Download}
                      onClick={() => console.log("Downloaded", selectedRows)}
                    >
                      Download
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}
                  >
                    <TableToolbarSearch
                      onChange={(event: "" | ChangeEvent<HTMLInputElement>) => {
                        if (typeof event !== "string") {
                          onInputChange(event);
                        }
                      }}
                    />
                    <TableToolbarMenu>
                      <TableToolbarAction onClick={() => alert("Action 1")}>
                        Action 1
                      </TableToolbarAction>
                      <TableToolbarAction onClick={() => alert("Action 2")}>
                        Action 2
                      </TableToolbarAction>
                      <TableToolbarAction onClick={() => alert("Action 3")}>
                        Action 3
                      </TableToolbarAction>
                    </TableToolbarMenu>
                    <Button kind="primary" onClick={addNewRow}>
                      Add new
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>

                <Table {...getTableProps()} aria-label="Archive Data Table">
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => (
                        <TableHeader
                          {...getHeaderProps({ header })}
                          key={header.key}
                        >
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow {...getRowProps({ row })} key={row.id}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </DataTable>

        {/* Confirmation Modal */}
        <ComposedModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <ModalHeader title="Confirm Deletion" />
          <ModalBody>
            <p>Are you sure you want to delete the selected rows?</p>
          </ModalBody>
          <ModalFooter
            primaryButtonText="Confirm"
            secondaryButtonText="Cancel"
            onRequestClose={() => setIsDeleteModalOpen(false)}
            onRequestSubmit={confirmDelete}
          >
            <> </>
          </ModalFooter>
        </ComposedModal>
      </main>
    </>
  );
};

export default ArchiveTable;
