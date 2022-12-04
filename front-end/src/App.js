import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert= (message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }



  return (
    
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar showAlert={showAlert} />
          <Alert alert={alert}/>
          <div className='container w-75 mx-auto'>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />



            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>


  );
}

export default App;
