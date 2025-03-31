import React, { useState, ChangeEvent } from "react";
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
  Modal, // Import the Modal component
} from "@carbon/react";
import { TrashCan, Save, Download } from "@carbon/icons-react";

interface TableHeader {
  key: string;
  header: string;
}

interface TableRowData {
  id: string;
  [key: string]: any;
}

interface DataTableProps {
  headers: TableHeader[];
  rows: TableRowData[];
  onAddRow: () => void;
  onDeleteRows: (selectedRows: TableRowData[]) => void;
}

const CustomDataTable = ({
  headers,
  rows,
  onAddRow,
  onDeleteRows,
}: DataTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState<TableRowData[]>([]);

  const handleDeleteClick = (selectedRows: TableRowData[]) => {
    setRowsToDelete(selectedRows);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    onDeleteRows(rowsToDelete);
    setIsModalOpen(false);
  };

  return (
    <>
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
              title="Custom Data Table"
              {...getTableContainerProps()}
            >
              <TableToolbar>
                <TableBatchActions {...batchActionProps}>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    onClick={() => handleDeleteClick(selectedRows)}
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
                  <Button kind="primary" onClick={onAddRow}>
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>

              <Table {...getTableProps()} aria-label="Custom Data Table">
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
      <Modal
        open={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalHeading="Confirm Deletion"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onSecondarySubmit={() => setIsModalOpen(false)}
        onRequestSubmit={confirmDelete}
      >
        <p>Are you sure you want to delete the selected rows?</p>
      </Modal>
    </>
  );
};

export default CustomDataTable;
