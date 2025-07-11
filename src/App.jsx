import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/Pastes'
import ViewPaste from './components/ViewPaste'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
        <div>
          <Navbar/>
          <Home/>
        </div>
    },
    {
      path: '/pastes',
      element: 
        <div>
          <Navbar/>
          <Pastes/>
        </div>
    },
    {
      path: '/pastes/:id',
      element: 
        <div>
          <Navbar/>
          <ViewPaste/>
        </div>
    }
  ]
)

const App = () => {
  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App