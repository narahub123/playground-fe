import { SignupState, updateField } from "@/store/slices/signupSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useImagePreview = (field: string) => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
        dispatch(
          updateField({
            field: field as keyof SignupState,
            value: reader.result as string,
          })
        );
      };

      reader.readAsDataURL(file);
    } else {
      setImgUrl(imgUrl);
    }
  };

  return { handleImageChange, imgUrl, setImgUrl };
};

export default useImagePreview;
