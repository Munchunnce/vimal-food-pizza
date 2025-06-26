import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../CartContext";
import Toast from "../components/Toast/Toast";



const SingleProduct = () => {

  const [product, setProduct] = useState({});
  const {cart, setCart } = useContext(CartContext);
  const params = useParams();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState(null); //  Toast info
  
  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${params.id}`)
        .then(res => res.json())
        .then(product => {
          setProduct(product);
        })
  },[params.id]);

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
    
    <div className="container mx-auto mt-12">
      <button className="mb-12 font-bold cursor-pointer" onClick={() => navigate('/')}>Back</button>
      <div className="flex">
        <img className="w-64 h-64 object-cover rounded-lg"  src={product.image} alt="pizza" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.difficulty}</div>
          <div className="font-bold mt-2">₹ {product.caloriesPerServing}</div>
          {/* <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add to cart</button> */}
          <button disabled={isAdding} onClick={(e) => addToCart(e, product)} className={`${ isAdding ? 'bg-green-500' : 'bg-yellow-500' } py-1 px-8 rounded-full font-bold mt-4 cursor-pointer`}>
            {isAdding ? 'ADDED' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
   </>  
  )
}

export default SingleProduct;
