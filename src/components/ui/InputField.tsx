import React from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = true,
}) => (
  <div className={styles.input__container}>
    <label htmlFor={name} className={styles.label}>
      {label}:
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.textarea}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.input}
      />
    )}
  </div>
);

export default InputField;
