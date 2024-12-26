import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { ReferralsList } from './pages/ReferralsList'
// import { InvestmentsList } from './pages/InvestmentsList'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/referals" element={<ReferralsList />} />
        {/* <Route path="/activities" element={<InvestmentsList />} /> */}
      </Routes>
      <Toaster />

    </>
  )
}

export default App
