import { AuthButton } from "@/components";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Page Not Found</h1>
        <section className={styles["text-container"]}>
          <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
          <p>존재하지 않는 주소를 입력하셨거나,</p>
          <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        </section>
        <section className={styles["btns-container"]}>
          <Link to={"/auth"} className={styles["btn-wrapper"]}>
            <AuthButton imgUrl="" label="홈으로" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
