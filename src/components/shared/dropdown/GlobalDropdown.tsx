"use client";

import React from "react";
import { Dropdown } from "@carbon/react";

interface GlobalDropdownProps {
  id: string;
  titleText: string;
  label: string;
  items: string[];
  selectedItem: string | null;
  onChange: (selectedItem: string | null) => void;
}

const GlobalDropdown: React.FC<GlobalDropdownProps> = ({
  id,
  titleText,
  label,
  items,
  selectedItem,
  onChange,
}) => {
  return (
    <Dropdown
      id={id}
      titleText={titleText}
      label={label}
      items={["None", ...items]} // Add "None" option to deselect
      selectedItem={selectedItem} // Pass current selection
      onChange={({ selectedItem }) =>
        onChange(selectedItem === "None" ? null : (selectedItem as string))
      }
    />
  );
};

export default GlobalDropdown;
