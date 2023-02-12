import "./ProfileBar.css"

//fix type script stuff
type ProfileBarProps = {
    children: React.ReactNode;
    data: boolean
}

export default function ProfileBar(props: ProfileBarProps) {

    let profileBar = document.querySelector("#profileBar") as HTMLElement;
    if(props.data){
        console.log(props.data)
        //Fix type script BS
        if(profileBar){
            profileBar.style.right = "0%"
        }
    }else{
        console.log(props.data)
        if(profileBar){
            profileBar.style.right = "-20%"
        }
    }

    return (
        <div id="profileBar">
            {props.children}
        </div>
    )
}
