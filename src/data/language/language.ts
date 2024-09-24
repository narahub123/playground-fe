import { LangObjType } from "@/types";
import { korean } from "./korean";
import { english } from "./english";
import { japanese } from "./japanese";
import { chinese } from "./chinese";

const langObj: LangObjType = {
  ko: korean,
  en: english,
  jp: japanese,
  cn: chinese,
};

export { langObj };
