import { useEffect, useState } from "react";
import Product from "./Product";


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
        .then(response => response.json())
        .then(products => {
            setProducts(products.recipes);
        })
  }, []);


  return (
    <div className="container m-auto ">
        <h1 className="text-lg font-bold my-8">Products</h1>
        <div className="grid grid-cols-5 my-8 gap-15">
            {
                products.map(product => <Product key={product.id} product={product}/>)
            }
        </div>
    </div>
  )
}

export default Products;
