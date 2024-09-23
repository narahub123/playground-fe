import { LangObjType } from "@/types";
import { korean } from "./korean.data";
import { english } from "./english.data";
import { japanese } from "./japanese.data";
import { chinese } from "./chinese.data";

const langObj: LangObjType = {
  ko: korean,
  en: english,
  jp: japanese,
  cn: chinese,
};

export { langObj };
