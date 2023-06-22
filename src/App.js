import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Container } from '@material-ui/core';
//username for app:user1@gmail.com
//password:123
function App() {
  return (
    <div className="App">
    <Container>
      <BrowserRouter>
      <Routes>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/" element={<Home/>}/>
      </Routes>
      </BrowserRouter> 
   </Container>

    </div>
  );
}

export default App;
