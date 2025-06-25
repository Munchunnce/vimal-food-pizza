import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import Toast from "./Toast/Toast";

const Product = (props) => {
  
  const {cart, setCart } = useContext(CartContext);    // ye App.js file se aa rha cart & setCart , cart ko store krne ke liye
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState(null); //  Toast info
  const { product } = props;

  // addToCart click functionality
  const addToCart = (e, product)  => {
    e.preventDefault();
    let _cart =  { ...cart }; // { items: {}}

    if(!_cart.items){
      _cart.items = {};  // iske andar abhi hum empty object dal rhe hai
    }

    if(_cart.items[product.id]){
      _cart.items[product.id] += 1;  //cart ke andar items ko add kr rhe hai
    } else{
      _cart.items[product.id] = 1;
    }

    if(!_cart.totalItems){
      _cart.totalItems = 0;
    }

    _cart.totalItems += 1;

    setCart(_cart);

    // Show toast with product name
    setToast({ message: `🛒 added to cart!`, type: 'success' });

    // click button color change
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <>
    
      {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )

        }
      <Link to={`/products/${product.id}`}>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src={product.image} alt="peproni" className="w-full"/>
          <div className="text-center">
            <h2 className="text-large font-bold py-2">{product.name}</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
              {product.difficulty}
            </span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span>₹ {product.caloriesPerServing}</span>
            <button disabled={isAdding} onClick={(e) => addToCart(e, product)} className={`${ isAdding ? 'bg-green-500' : 'bg-yellow-500' } py-1 px-4 rounded-full font-bold cursor-pointer`}>
              ADD{isAdding ? 'ED' : ''}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
