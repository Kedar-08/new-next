import React from "react";
import { TextInput } from "@carbon/react";

interface TextInputProps {
  id: string;
  name: string;
  type?: string;
  labelText: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  invalidText?: string;
}

const TextInputField: React.FC<TextInputProps> = ({
  id,
  name,
  type = "text",
  labelText,
  placeholder,
  value,
  onChange,
  onBlur,
  invalid,
  invalidText,
}) => {
  return (
    <TextInput
      id={id}
      name={name}
      type={type}
      labelText={labelText}
      placeholder={placeholder}
      value={value} // ✅ Supports form input
      onChange={onChange} // ✅ Handles form updates
      onBlur={onBlur} // ✅ Validates on blur
      invalid={invalid}
      invalidText={invalidText}
    />
  );
};

export default TextInputField;
