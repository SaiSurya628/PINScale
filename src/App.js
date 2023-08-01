import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AllTransacation from './components/AllTransaction';
import Profile from './components/Profile';
import HistoryList from './components/HistoryList';


const App=()=>{
  return(<div>
    <BrowserRouter>
    <div >
   
    <Routes>
      <Route exact path="/" element={<LoginPage/>}/>
      
      <Route exact path="/Dashboard" element={<Dashboard/>}/>
      <Route exact path="/transaction" element={<AllTransacation/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  </div>)
}

export default App;
