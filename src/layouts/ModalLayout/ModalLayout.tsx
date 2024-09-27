import { ReactNode, useState } from "react";
import styles from "./ModalLayout.module.css";

interface ModalLayoutProps {
  title: string;
  button: (isValid: boolean) => ReactNode;
  children: (
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => ReactNode;
}

const ModalLayout = ({ title, children, button }: ModalLayoutProps) => {
  const [isValid, setIsValid] = useState(false);

  console.log(isValid);

  return (
    <div className={styles.container}>
      <section className={styles.header}>{title}</section>
      <section className={styles.content}>{children(setIsValid)}</section>
      <section className={styles.footer}>{button(isValid)}</section>
    </div>
  );
};

export default ModalLayout;
