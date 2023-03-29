import styles from "./ProfileBar.module.scss";
import closeImg from "../../assets/close.png";
import Rodal from "rodal";
import { removeUser } from "../../custom-query-hooks/useGoogleOAuth";
import { useQueryClient } from "react-query";
import axios from "axios";
import { useUser } from "../../custom-query-hooks";
import profileImg from "../../assets/profile.png";
import { useRef } from "react";
import { User } from "../../../../types/User";
import { useTranslation } from "react-i18next";

//fix type script stuff
type ProfileBarProps = {
  isOpen: boolean;
  toggleFunc: () => void;
  changeProfileImg: (url: string | null) => void;
  profileUrl: string;
};

export default function ProfileBar(props: ProfileBarProps) {
  const qc = useQueryClient();
  const user = useUser();
  const inputref: any = useRef(null);
  const { t } = useTranslation("profile");

  let file: File | null = null;

  async function uploadFile(file: File | null) {
    if (file !== null) {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("id", user._id);
      let post = await axios.post("/api/uploadBlob", formData);
      let response = await post.data;
      const userLocalStorage = qc.getQueryData("user") as User;
      userLocalStorage.picture = response.url;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(userLocalStorage));
      props.changeProfileImg(response.url);
    }
  }

  const handleInput = () => {
    if (inputref.current !== null) {
      inputref.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    uploadFile(file);
  };

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
          {props.profileUrl === "" ? (
            <img
              className={styles["profileImg"]}
              src={profileImg}
              alt="profile"
              referrerPolicy="no-referrer"
            ></img>
          ) : props.profileUrl.length > 1 ? (
            <img
              className={styles["profileImg"]}
              referrerPolicy="no-referrer"
              src={props.profileUrl}
              alt="profile"
            ></img>
          ) : null}
          <div className={styles.changeProfileImgDiv}>
            <input
              style={{ display: "none" }}
              ref={inputref}
              type="file"
              name="file"
              onChange={handleFileChange}
            />
            <button className={styles.changeProfileImg} onClick={handleInput}>
              {" "}
              {t("change")}{" "}
            </button>
          </div>
          <h1>Elidjay Ross</h1>
          <div className={styles.profileInfo}>
            <h3>School: Dawson College</h3>
            <h3>Program: Computer Science</h3>
            <h3>Total Courses: 5</h3>
            <h3>Active Events: 7</h3>
            <h3>Completed Events: 3</h3>
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
            {t("logout")}{" "}
          </button>
        </div>
      </Rodal>
    </>
  );
}

// <button>
//             Set Image
//             <input type="file" name="file" onChange={(event) => {
//                   file = event.currentTarget.files ? event.currentTarget.files[0] : null;
//                 }} />
//             </button>
//             <button onClick={()=> uploadFile(file)}>
//               Submit
//             </button>
