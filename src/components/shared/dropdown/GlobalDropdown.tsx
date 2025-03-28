"use client";

import React from "react";
import { Dropdown } from "@carbon/react";

interface GlobalDropdownProps {
  id: string;
  label: string;
  items: string[] | { id: string; text: string }[]; // Support both formats
  selectedItem: string;
  onChange: (selectedItem: string) => void;
  disabled?: boolean;
  helperText?: string;
}

const GlobalDropdown: React.FC<GlobalDropdownProps> = ({
  id,
  label,
  items,
  selectedItem,
  onChange,
  disabled = false,
  helperText,
}) => {
  // Ensure items are formatted correctly
  const formattedItems =
    typeof items[0] === "string"
      ? (items as string[]) // If items are plain strings, use as-is
      : (items as { id: string; text: string }[]).map((item) => item.text); // Convert objects to strings

  return (
    <Dropdown
      id={id}
      titleText={label}
      label={selectedItem || "Select an option"}
      items={formattedItems} // Use formatted items
      selectedItem={selectedItem}
      onChange={({ selectedItem }) => onChange(selectedItem || "")}
      disabled={disabled}
      helperText={helperText}
    />
  );
};

export default GlobalDropdown;
