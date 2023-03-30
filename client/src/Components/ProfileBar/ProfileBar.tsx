import styles from "./ProfileBar.module.scss";
import closeImg from "../../assets/close.png";
import Rodal from "rodal";
import { removeUser } from "../../custom-query-hooks/useGoogleOAuth";
import { useQueryClient } from "react-query";
import profileImg from "../../assets/profile.png";
import { User } from "../../../../types/User";
import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections, useUser } from "../../custom-query-hooks";
import { UserClass } from "../../../../types/UserClass";

//fix type script stuff
type ProfileBarProps = {
  isOpen: boolean;
  toggleFunc: () => void;
  profileImageUrl: string;
};

export default function ProfileBar(props: ProfileBarProps) {
  const qc = useQueryClient();
  const user = useUser();
  const sections = useSections({ userClassSections: user.sections });
  const numberOfActiveEvents: number =
    sections.data?.reduce<number>((previous: number, current: UserClass) => {
      return previous + current.events.length;
    }, 0) ?? 0;

  return (
    <>
      <Rodal
        visible={props.isOpen}
        animation={"slideRight"}
        duration={150}
        customStyles={{
          height: "100%",
          minWidth: "300px",
          bottom: 0,
          padding: 0,
          margin: "0 0 0 auto",
          width: "20%",
        }}
        showMask={true}
        showCloseButton={false}
        closeMaskOnClick={true}
        onClose={() => {
          props.toggleFunc();
        }}
      >
        <div className={styles.profileBar}>
          <img
            className={styles.closeProfile}
            src={closeImg}
            alt="close icon"
            onClick={(e) => {
              e.preventDefault();
              props.toggleFunc();
            }}
          ></img>
          {props.profileImageUrl === "" ? (
            <img
              className={styles["profileImg"]}
              src={profileImg}
              alt="profile"
              referrerPolicy="no-referrer"
            ></img>
          ) : props.profileImageUrl.length > 1 ? (
            <img
              className={styles["profileImg"]}
              referrerPolicy="no-referrer"
              src={props.profileImageUrl}
              alt="profile"
            ></img>
          ) : null}
          <button className={styles.changeProfileImg}>Change</button>
          <h1>{user.name}</h1>
          <div className={styles.profileInfo}>
            <h3>Total Courses: {user.sections.length}</h3>
            <h3>Active Events: {numberOfActiveEvents}</h3>
            <h3>Completed Events: {user.completedEvents.length}</h3>
          </div>
          <button
            className={styles.logout}
            onClick={() => {
              removeUser();
              qc.invalidateQueries(["user"]);
              window.location.reload();
            }}
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      </Rodal>
    </>
  );
}
