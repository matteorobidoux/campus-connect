import "./ProfileBar.css"

//fix type script stuff
type ProfileBarProps = {
    children: React.ReactNode;
    data: boolean
}

export default function ProfileBar(props: ProfileBarProps) {

    if(props.data){
        console.log(props.data)
        let profileBar = document.querySelector("#profileBar");
        //Fix type script BS
        if(profileBar){
            profileBar.className = "openSidebar"
        }
    }else{
        console.log(props.data)
        let profileBar = document.querySelector("#profileBar");
        if(profileBar){
            profileBar.className = "closeSidebar"
        }
    }

    return (
        <div id="profileBar">
            {props.children}
        </div>
    )
}
