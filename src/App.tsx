import { RouterProvider } from 'react-router-dom'
import './App.css'
import { route } from './utils/routes'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Navbar />
      <RouterProvider router={route} />
      <Toaster />
    </>
  )
}

export default App
