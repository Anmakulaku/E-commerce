import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Store } from './pages/Store/Store'
import { ProductPage } from './pages/ProductPage/ProductPage'
import { Navbar } from './components/Navbar/Navbar'
import { Cart } from './pages/Cart/Cart'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {

  const RedirectToHome = () => <Navigate to="/" replace />;

  return (
    <ShoppingCartProvider>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/E-commerce/" element={<RedirectToHome />} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  )
}

export default App
