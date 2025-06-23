import './App.css';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import { CartContext } from './CartContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import { useEffect, useState } from 'react';




function App() {
  //  Load from localStorage on first render
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : { items: {}, totalItems: 0 };
    } catch {
      return { items: {}, totalItems: 0 };
    }
  });

  //  Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <BrowserRouter>
        <CartContext.Provider value={{cart, setCart}}>
          <Navigation/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/products' exact element={<ProductsPage/>}/>
            <Route path='/products/:id' element={<SingleProduct/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
