import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

const Product = (props) => {
  
  const {cart, setCart } = useContext(CartContext);    // ye App.js file se aa rha cart & setCart , cart ko store krne ke liye
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
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div>
        <img src={product.image} alt="peproni" />
        <div className="text-center">
          <h2 className="text-large font-bold py-2">{product.name}</h2>
          <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
            {product.difficulty}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span>₹ {product.caloriesPerServing}</span>
          <button onClick={(e) => addToCart(e, product)} className="bg-yellow-500 py-1 px-4 rounded-full font-bold cursor-pointer">
            ADD
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
