import { ReactNode } from "react";
import styles from "./ModalLayout.module.css";

interface ModalLayoutProps {
  title: string;
  button: ReactNode;
  children: ReactNode;
}

const ModalLayout = ({ title, children, button }: ModalLayoutProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>{title}</section>
      <section className={styles.content}>{children}</section>
      <section className={styles.footer}>{button}</section>
    </div>
  );
};

export default ModalLayout;
