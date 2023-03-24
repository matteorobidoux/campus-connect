import styles from "./ProfileBar.module.scss"
import closeImg from "../../assets/close.png"
import Rodal from "rodal"
import { removeUser } from "../../custom-query-hooks/useGoogleOAuth"
import { useQueryClient } from "react-query"
import axios from "axios"
import { useUser } from "../../custom-query-hooks"

//fix type script stuff
type ProfileBarProps = {
  isOpen: boolean,
  toggleFunc: () => void,
  changeProfileImg: (url: string | null) => void
}

export default function ProfileBar(props: ProfileBarProps) {
  const qc = useQueryClient();
  const user = useUser();
  let file: File | null = null;

  async function uploadFile(file: File | null){
    console.log(file)
    if (file !== null) {
      var formData = new FormData();
      formData.append('file',file);
      formData.append('id', user._id)
      let post = await axios.post('/api/uploadBlob', formData)
      let response = await post.data;
      console.log(response.url)
      props.changeProfileImg(response.url)
    }
  }

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
        onClose={() => { props.toggleFunc() }}>
        <div className={styles.profileBar}>
          <img className={styles.closeProfile} src={closeImg} alt="close icon" onClick={e => {
            e.preventDefault()
            props.toggleFunc()
          }}></img>
            <button>
            Set Image
            <input type="file" name="file" onChange={(event) => {
                  file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                }} />
            </button>
            <button onClick={()=> uploadFile(file)}>
              Submit
            </button>
          <h1>Login</h1>
          <form className={styles.login} id="login">
            <label htmlFor="username">Username</label>
            <input className={styles.username} id="username" type="text" />
            <label htmlFor="password">Password</label>
            <input className={styles.password} id="password" type="password" />
            <input className={styles.submit} id="submit" type="submit" onClick={e => {
              e.preventDefault()
              fetch('/api/authenticate').then(async r => {
                const k = await r.json();
                console.log(k.authorizationUrl);
                window.location.href = k.authorizationUrl;
              })
            }} value="Login" />
          </form>
          <button onClick={() => {
            removeUser();
            qc.invalidateQueries(['user']);
            window.location.reload();
          }}> Logout </button>
        </div>
      </Rodal>
    </>
  )
}
