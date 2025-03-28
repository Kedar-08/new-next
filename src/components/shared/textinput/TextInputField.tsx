import React from "react";
import { TextInput } from "@carbon/react";

interface TextInputProps {
  id: string;
  name?: string;  // Made optional
  type?: string;
  labelText: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;  // Made optional
  disabled?: boolean;  // Added missing prop
  invalid?: boolean;
  invalidText?: string;
  readOnly?: boolean;  // Added for completeness
}

const TextInputField: React.FC<TextInputProps> = ({
  id,
  name = id,  // Default to id if not provided
  type = "text",
  labelText,
  placeholder,
  value,
  onChange,
  onBlur = () => {},  // Default empty function
  disabled = false,
  invalid = false,
  invalidText,
  readOnly = false,
}) => {
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