import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { ProductPage } from './pages/ProductPage'
import { All } from './components/All'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {

  return (
    <ShoppingCartProvider>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
            <Route path="all" element={<All />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  )
}

export default App
