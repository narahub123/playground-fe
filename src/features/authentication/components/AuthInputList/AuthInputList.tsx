import React, { useEffect, useRef } from "react";
import styles from "./AuthInputList.module.css";
import { AuthInputListType } from "@/types";
import { useScrollToCenter } from "@/hooks";

interface AuthInputListProps {
  list: AuthInputListType[];
  index: number | undefined;
  isOpen: boolean;
  setSelect: React.Dispatch<
    React.SetStateAction<AuthInputListType | undefined>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthInputList = ({
  list,
  index,
  isOpen,
  setSelect,
  setIsOpen,
}: AuthInputListProps) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const openCond = isOpen ? styles.open : undefined;

  useScrollToCenter(index, containerRef, 4);

  const handleClick = (item: AuthInputListType) => {
    setSelect(item);
    setIsOpen(false);
  };

  return (
    <ul className={`${styles.container} ${openCond}`} ref={containerRef}>
      {list.map((item, idx) => (
        <li
          key={item.value}
          className={`${styles.item} ${openCond} ${
            index === idx ? styles.selected : undefined
          }`}
          onClick={() => handleClick(item)}
        >
          <p className={styles.text}>{item.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default AuthInputList;
