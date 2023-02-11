import { profile } from "console";
import "./NavBar.css";
import profileImg from "./profile.png";

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <h1 id="logo">Campus Connect</h1>
        <img id="profile" src={profileImg} alt="profile"></img>
      </nav>
    </div>
  );
}

export default NavBar;
