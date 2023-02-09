import './App.css';
import Main from './Components/Main/Main';
import MainSidebar from './Components/MainSidebar/MainSidebar';
import NavBar from './Components/NavBar/NavBar';
import ProfileBar from './Components/ProfileBar/ProfileBar';

function App() {
  return (
    <div className='app-container'>
      <NavBar/>
      <div className="app-content-container">
        <MainSidebar />
        <Main />
      </div>
      <ProfileBar />
    </div>
  );
}

export default App;
