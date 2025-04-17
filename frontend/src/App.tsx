import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupHome } from './pages/SignupHome'
import { SigninHome } from './pages/SigninHome'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignupHome></SignupHome>} ></Route>
      <Route path='/signin' element={<SigninHome></SigninHome>} ></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
