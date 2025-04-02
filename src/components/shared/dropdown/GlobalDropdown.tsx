"use client";

import React from "react";
import { Dropdown } from "@carbon/react";

interface GlobalDropdownProps {
  id: string;
  titleText?: string;
  label: string;
  items: (string | { id: string; text: string })[];
  selectedItem: string | null;
  onChange: (selectedItem: string | null) => void;
  disabled?: boolean;
  helperText?: string;
}

const GlobalDropdown: React.FC<GlobalDropdownProps> = ({
  id,
  titleText,
  label,
  items,
  selectedItem,
  onChange,
  disabled = false,
  helperText,
}) => {
  // Improved type guard
  const isObjectArray = (
    arr: (string | { id: string; text: string })[]
  ): arr is { id: string; text: string }[] =>
    arr.some((item) => typeof item === "object");

  const formattedItems = isObjectArray(items)
    ? items.map((item) => item.text) // Extract text from objects
    : (items as string[]); // Already strings

  return (
    <Dropdown
      id={id}
      titleText={titleText ?? label} // Use ?? for a safer fallback
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
