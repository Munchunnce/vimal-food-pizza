import './App.css';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/products' exact element={<ProductsPage/>}/>
          <Route path='/products/:id' element={<SingleProduct/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
