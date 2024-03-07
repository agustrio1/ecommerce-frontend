import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  key?: string;
  onClick?: () => void;
  text?: string;
  color?: string;
  textColor?: string;
  icon?: ReactNode;
  ariaLabel?: string;
};

const getButtonColorClass = (color: string) => {
  switch (color) {
    case "yellow":
      return styles.yellow;
    case "gray":
      return styles.gray;
    case "blue":
      return styles.blue;
    case "green":
      return styles.green;
    case "red":
      return styles.red;
    case "indigo":
      return styles.indigo;
    case "white":
      return styles.white;
    case "black":
      return styles.black;
    case "transparent":
      return styles.transparent;
    default:
      return styles.gray;
  }
};

const getTextColorClass = (color: string) => {
  switch (color) {
    case "yellow":
    case "green":
    case "indigo":
    case "red":
    case "blue":
    case "gray":
    case "white":
    case "black":
    case "transparent":
      return styles.whiteText;
    default:
      return styles.blackText;
  }
};

const Button = ({ onClick, text, color, icon, ariaLabel, ...props }: ButtonProps) => {
  const buttonColorClass = getButtonColorClass(color || "gray");
  const textColorClass = getTextColorClass(color || "gray");

  return (
    <button
      onClick={onClick}
      className={`${buttonColorClass} ${styles.button} ${textColorClass}`}
      aria-label={ariaLabel || 'text'}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;