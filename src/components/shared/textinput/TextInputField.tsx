import React from "react";
import { TextInput } from "@carbon/react";

interface TextInputProps {
  id: string;
  name?: string; // Optional
  type?: string;
  labelText: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Optional
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  readOnly?: boolean;
}

const TextInputField = ({
  id,
  name = id, // Default to id if not provided
  type = "text",
  labelText,
  placeholder,
  value,
  onChange,
  onBlur = () => {}, // Default empty function
  disabled = false,
  invalid = false,
  invalidText,
  readOnly = false,
}: TextInputProps) => {
  return (
    <TextInput
      id={id}
      name={name}
      type={type}
      labelText={labelText}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      invalid={invalid}
      invalidText={invalidText}
      readOnly={readOnly}
    />
  );
};

export default TextInputField;
