import { profile } from "console";
import "./NavBar.css";

//Fix type script BS
type NavBarProps = {
    children: React.ReactNode;
}

function NavBar(props: NavBarProps) { 

  return (
    <div className="navbar">
      <nav>
        <h1 id="logo">Campus Connect</h1>
        {props.children}
      </nav>
    </div>
  );
}

export default NavBar;
