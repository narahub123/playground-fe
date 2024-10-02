import { CONSTANT } from "@/constants";
import { langObj } from "../language/language";

// 성별 선택 목록
const genderList = [
  {
    name: "남성",
    value: "m",
  },
  {
    name: "여성",
    value: "f",
  },
  {
    name: "양성",
    value: "b",
  },
  {
    name: "중성",
    value: "n", // neutral
  },
  {
    name: "무성",
    value: "l", // genderless
  },
  {
    name: "숨김",
    value: "h",
  },
];

// 날짜 선택 목록
const calendarList = (() => {
  const today = new Date();
  const curYear = today.getFullYear();

  // 년
  const startYear = 1900;

  const yearList = Array.from({ length: curYear - startYear + 1 })
    .map((_, i) => ({ name: i + startYear + "년", value: i + startYear }))
    .reverse();

  // 월
  const monthList = (lang: string = "ko") => {
    const months = Array.from({ length: 12 }).map((_, i) => {
      return {
        name: langObj[lang].month[(i + 1).toString()],
        value: i + 1,
      };
    });

    return months;
  };

  // 일
  const dateList = (year: number = curYear, month: number = 0) => {
    const target = new Date(year, month, 0);
    const LastDateOfMonth = target.getDate();

    const dates = Array.from({ length: LastDateOfMonth }).map((_, i) => ({
      name: i + 1 + "일",
      value: i + 1,
    }));

    return dates;
  };
  return {
    yearList,
    monthList,
    dateList,
  };
})();

// 회원 가입 리스트 목록
const signupLists = {
  genderList,
  calendarList,
};

// 인증 유효성 정규 표현식
const AuthRegExList = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  password: {
    alphabet: /[A-Za-z]/,
    number: /\d/,
    char: /[@$!%*#?&]/,
    length: `/.{${CONSTANT.PASSWORD_MIN}, ${CONSTANT.PASSWORD_MAX}}/`,
    total: `/[A-Za-z]\d[@$!%*#?&].{${CONSTANT.PASSWORD_MIN}, ${CONSTANT.PASSWORD_MAX}}/`,
  },
};

export { signupLists, AuthRegExList };
