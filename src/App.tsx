import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Store } from './pages/Store/Store';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { Navbar } from './components/Navbar/Navbar';
import { Cart } from './pages/Cart/Cart';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout/Checkout';
import { ProductsProvider } from './context/ProductContext';
import { CartOverlayProvider } from './context/OverlayContext';
import { Thankyou } from './pages/Thankyou/Thankyou';

function App() {
  return (
    <ProductsProvider>
      <CartOverlayProvider>
        <CartProvider>
          <div className='App'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/store' element={<Store />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/thankyou' element={<Thankyou />} />
            </Routes>
          </div>
        </CartProvider>
      </CartOverlayProvider>
    </ProductsProvider>
  );
}

export default App;
