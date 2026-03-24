import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes,  Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
 <BrowserRouter>
 <Header/>
 <Routes>
  <Route path='/' element={<LandingPage/>}/>
 </Routes>
 <Footer/>
 </BrowserRouter>
  );
}

export default App;
