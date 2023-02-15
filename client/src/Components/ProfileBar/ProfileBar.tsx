import "./ProfileBar.css"
import closeImg from "../../close.png"

//fix type script stuff
type ProfileBarProps = {
    isOpen: boolean,
    toggleFunc: Function
}

export default function ProfileBar(props: ProfileBarProps) {

    let profileBar = document.querySelector("#profileBar") as HTMLElement;
    if (props.isOpen && profileBar) {
        profileBar.style.right = "0%"
    } else if (!props.isOpen && profileBar) {
        profileBar.style.right = "-30%"
    }

    return (
        <div id="profileBar">
            <img id="closeProfile" src={closeImg} alt="close icon" onClick={e => {
                e.preventDefault()
                props.toggleFunc(e)
            }}></img>
            <h1>Login</h1>
            <form id="login">
                <input id="username" type="text"></input>
                <input id="password" type="password"></input>
                <input id="submit" type="submit" onClick={e => {
                    e.preventDefault()
                }}></input>
            </form>
        </div>
    )
}
