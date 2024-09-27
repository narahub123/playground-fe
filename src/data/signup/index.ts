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

const today = new Date();
const curYear = today.getFullYear();
// 년
const startYear = 1900;

const yearList = Array.from({ length: curYear - startYear + 1 })
  .map((_, i) => ({ name: i + startYear, value: i + startYear }))
  .reverse();

// 월

// 일

// 날짜 선택 목록
const calendarList = {
  yearList,
};

// 회원 가입 리스트 목록
const signupLists = {
  genderList,
  calendarList,
};

export { signupLists };
