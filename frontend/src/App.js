import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Create from './component/Create';
import Read from './component/Read';
import Update from './component/Update';
import Home from './component/Home';
import Login from './component/Login';
import { BrowserRouter,Routes ,Route ,useLocation } from 'react-router-dom';
function App() {

  const location = useLocation();
  
  // Determine if Navbar should be displayed
  const shouldShowNavbar = ['/Create', '/all'].includes(location.pathname);


  return (
    <div className='App'>

      {shouldShowNavbar && <Navbar />}
      <Routes>
         <Route  path='/' element={<Home/>}/>
         <Route  path='/Login' element={<Login/>}/>
        
         
        <Route exact path='/Create' element={<Create />}/>
        <Route  path='/all' element={<Read/>}/>
        <Route path='/:id' element={<Update/>}/>
     </Routes>
   
    </div>
  );
}

export default()=>(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
