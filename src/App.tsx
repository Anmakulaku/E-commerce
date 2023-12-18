import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { ProductPage } from './pages/ProductPage'
import { All } from './components/All'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
        <Route path="all" element={<All />} />
      <Route path="/productPage" element={<ProductPage />} />
    </Routes>
  )
}

export default App
