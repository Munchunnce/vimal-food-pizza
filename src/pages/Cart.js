import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (!cart.items || Object.keys(cart.items).length === 0) {
      setProducts([]);
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
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [cart]);

  return (
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
                <button className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>-</button>
                <b className='px-4'>{cart.items[product.id]}</b>
                <button className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>+</button>
              </div>
              <span>₹ {product.caloriesPerServing * cart.items[product.id]}</span>
              <button className='bg-red-500 px-4 py-2 rounded-full leading-none text-white'>Delete</button>
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
        <button className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>Order Now</button>
      </div>
    </div>
  );
};

export default Cart;
