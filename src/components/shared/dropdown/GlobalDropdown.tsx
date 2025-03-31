"use client";

import React from "react";
import { Dropdown } from "@carbon/react";

interface GlobalDropdownProps {
  id: string;
  titleText?: string;
  label: string;
  items: string[] | { id: string; text: string }[];
  selectedItem: string | null;
  onChange: (selectedItem: string | null) => void;
  disabled?: boolean;
  helperText?: string;
}

const GlobalDropdown = ({
  id,
  titleText,
  label,
  items,
  selectedItem,
  onChange,
  disabled = false,
  helperText,
}: GlobalDropdownProps) => {
  const formattedItems =
    typeof items[0] === "string"
      ? (items as string[])
      : (items as { id: string; text: string }[]).map((item) => item.text);

  return (
    <Dropdown
      id={id}
      titleText={titleText || label}
      label="Select an option"
      items={formattedItems}
      selectedItem={selectedItem ?? null}
      onChange={({ selectedItem }) => onChange(selectedItem ?? null)}
      disabled={disabled}
      helperText={helperText}
    />
  );
};

export default GlobalDropdown;
