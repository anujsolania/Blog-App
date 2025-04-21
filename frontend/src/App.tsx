import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupHome } from './pages/SignupHome'
import { SigninHome } from './pages/SigninHome'
import { Blog } from './pages/Blog'
import { Createblog } from './pages/Createblog'
import { BlogS } from './pages/BlogS'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignupHome></SignupHome>} ></Route>
      <Route path='/signin' element={<SigninHome></SigninHome>} ></Route>
      <Route path='/blog' element={<Blog></Blog>} ></Route>
      <Route path='/createblog' element={<Createblog></Createblog>} ></Route>
      <Route path='/blogs' element={<BlogS></BlogS>} ></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
