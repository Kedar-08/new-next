import React, { useRef } from "react";
import { TextInput, Button } from "@carbon/react";
import styles from "./FileInput.module.scss";

interface FileInputProps {
  id: string;
  labelText: string;
  placeholder?: string;
  value: string;
  onChange: (fileName: string) => void;
  disabled?: boolean;
}

const FileInput = ({
  id,
  labelText,
  placeholder = "No file chosen",
  value,
  onChange,
  disabled = false,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file.name);
    }
  };

  return (
    <div className={styles.fileInputWrapper}>
      <label htmlFor={id} className={styles.labelText}>
        {labelText}
      </label>

      {/* Wrapper for input and button */}
      <div className={styles.inputContainer}>
        <TextInput
          id={id}
          placeholder={placeholder}
          value={value}
          readOnly
          disabled={disabled}
          labelText={undefined}
        />
        <Button
          kind="primary"
          size="sm"
          onClick={handleBrowseClick}
          disabled={disabled}
          className={styles.browseButton}
        >
          Browse
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className={styles.hiddenFileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
