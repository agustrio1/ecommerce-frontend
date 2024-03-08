import React from "react";
import styles from "./InputField.module.css";

interface InputFileProps {
    label: string;
    name: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }
  

const InputFile: React.FC<InputFileProps> = ({
  label,
  name,
  onChange,
  required = true,
}) => (
  <div className={styles.input__container}>
    <label htmlFor={name} className={styles.label}>
      {label}:
    </label>
    <input
      type="file"
      id={name}
      name={name}
      onChange={onChange}
      required={required}
      className={styles.input}
    />
  </div>
);

export default InputFile;
