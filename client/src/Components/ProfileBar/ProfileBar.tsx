import "./ProfileBar.css"

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
        profileBar.style.right = "-25%"
    }

    return (
        <div id="profileBar">
            <button onClick={e => {
                e.preventDefault()
                props.toggleFunc(e)
            }}>Close Profile Bar</button>
        </div>
    )
}
