import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Reset } from './pages/Reset'
import { LoginBySms } from './pages/sms/sms'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route path='/login-by-sms' element={<LoginBySms />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/reset' element={<Reset />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
