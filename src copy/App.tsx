import { RouterProvider } from 'react-router-dom'
import './App.css'
import { route } from './utils/routes'

import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <>
     
      <RouterProvider router={route} />
      <Toaster />
    </>
  )
}

export default App
