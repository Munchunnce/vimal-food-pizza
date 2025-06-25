import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import Toast from "../components/Toast/Toast";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [priceFetched, setTogglePriceFetched] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const [toast, setToast] = useState(null); //  Toast info

  useEffect(() => {
    if (!cart.items || Object.keys(cart.items).length === 0) {
      setProducts([]);
      return;
    }

    if(priceFetched){
      return;
    }

    const fetchProducts = async () => {
      const ids = Object.keys(cart.items); // e.g., ["4", "21"]
      try {
        const productRequests = ids.map(id =>
          fetch(`https://dummyjson.com/recipes/${id}`).then(res => res.json())
        );
        const products = await Promise.all(productRequests);
        setProducts(products);
        setTogglePriceFetched(true);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [cart, priceFetched]);

  const increment = (productId) => {
    const existingQyt = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = existingQyt + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  }

  // decrement button
  const decrement = (productId) => {
    const existingQyt = cart.items[productId];
    if(existingQyt === 1){
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = existingQyt - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  // order now delete function
  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    setProducts(products.filter((product) => product.id !== productId));
  }

  // handleOrder now cart items delete all order sucess
  const handleOrderNow = () => {
    // Show toast with product name
    setToast({ message: `🛒 Order place successfully`, type: 'success' });
    window.alert('Order place successfully');
    setProducts([]);
    setCart({});
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
     
    {!products.length ?(
    <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="empty-cart"/>
    ) : (
    <div className='container mx-auto lg:w-1/2 w-full pb-24'>
      <h1 className='my-12 font-bold'>Cart items</h1>
      <ul>
        {products.map(product => (
          <li key={product.id} className='mb-12'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img className='h-16' src={product.image} alt={product.name} />
                <span className='font-bold ml-4 w-48'>{product.name}</span>
              </div>
              <div>
                <button onClick={() => decrement(product.id) } className='bg-yellow-500 px-4 py-2 rounded-full leading-none cursor-pointer'>-</button>
                <b className='px-4'>{cart.items[product.id]}</b>
                <button onClick={() => increment(product.id) } className='bg-yellow-500 px-4 py-2 rounded-full leading-none cursor-pointer'>+</button>
              </div>
              <span>₹ {product.caloriesPerServing * cart.items[product.id]}</span>
              <button onClick={() => { handleDelete(product.id)}} className='bg-red-500 px-4 py-2 rounded-full leading-none text-white cursor-pointer'>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <hr className='my-6' />
      <div className='text-right'>
        <b>Grand total: ₹ {
          products.reduce((acc, product) =>
            acc + product.caloriesPerServing * cart.items[product.id], 0)
        }</b>
      </div>
      <div className="text-right mt-6">
        <button onClick={handleOrderNow} className='bg-yellow-500 px-4 py-2 rounded-full leading-none cursor-pointer'>Order Now</button>
      </div>
    </div>
    )}
  </>   
  );
};

export default Cart;
