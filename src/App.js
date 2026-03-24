import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes,  Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import UserLogin from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/Dashboard';
import ChatButton from './components/ChatButton';
import ChatModal from './components/ChatModal';
import { useContext } from 'react';
import { Context } from './components/Context';



function App() {

  const {openChatModal} =useContext(Context);


  return (
 <BrowserRouter>
 <Header/>
 <Routes>
  <Route path='/' element={<LandingPage/>}/>

  
    
      <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<UserLogin/>}/>
  <Route path='/dashboard' element={<UserDashboard/>}/> 
  
 </Routes>
 <ChatButton/>
 {openChatModal&&<ChatModal/>}
 <Footer/>
 </BrowserRouter>
  );
}

export default App;
