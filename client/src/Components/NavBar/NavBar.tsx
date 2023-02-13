import profileImg from "../../profile.png"
import "./NavBar.css";

//Fix type script BS
type NavBarProps = {
  toggleSidebar: Function
}

function NavBar(props: NavBarProps) {

  return (
    <div className="navbar">
      <nav>
        <h1 id="logo">Campus Connect</h1>

        <img id="profile" src={profileImg} alt="profile" onClick={e => {
          e.preventDefault()
          props.toggleSidebar(e)
        }}></img>
      </nav>
    </div>
  );
}

export default NavBar;
