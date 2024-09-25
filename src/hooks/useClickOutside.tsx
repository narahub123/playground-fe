import { setOpenModal } from "@/store/slices/modalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        setToggle ? setToggle(false) : dispatch(setOpenModal(false));
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, setToggle]);
};

export default useClickOutside;
