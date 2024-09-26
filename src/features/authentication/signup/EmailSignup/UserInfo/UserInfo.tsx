import styles from "./UserInfo.module.css";

const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.field}>이름</section>
      <section className={styles.field}>성별</section>
      <section className={styles.field}>이메일</section>
      <section className={styles.container}>
        <p className={styles.title}>생년월일</p>
        <p className={styles.detail}>어쩌구 저쩌구</p>
        <div className={styles.birth}>
          <span className={styles.field}>년</span>
          <span className={styles.field}>월</span>
          <span className={styles.field}>일</span>
        </div>
      </section>
    </div>
  );
};

export default UserInfo;
