import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes,  Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import UserLogin from './components/Login';
import UserSignup from './components/Signup';
import UserDashboard from './components/Dashboard';



function App() {
  return (
 <BrowserRouter>
 <Header/>
 <Routes>
  <Route path='/' element={<LandingPage/>}/>

  
    
      <Route path='/signup' element={<UserSignup/>}/>
  <Route path='/login' element={<UserLogin/>}/>
  <Route path='/dashboard' element={<UserDashboard/>}/> 
 </Routes>
 <Footer/>
 </BrowserRouter>
  );
}

export default App;
