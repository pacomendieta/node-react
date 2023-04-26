import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShowBlogs from './blog/ShowBlogs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateBlog from './blog/createBlog'
import EditBlog from './blog/EditBlog'


function App() {

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h2>Blogs:</h2>
        <BrowserRouter>
        <Routes>
           <Route path='/'     element={<ShowBlogs/>}>   </Route>
           <Route path='/edit/:id' element={<EditBlog/>}></Route>
           <Route path='/create' element={<CreateBlog/>}></Route>
	         

        </Routes>  
        </BrowserRouter>
   
      </div>


    </>
  )
}

export default App
