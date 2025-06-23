import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const SingleProduct = () => {

  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${params.id}`)
        .then(res => res.json())
        .then(product => {
          setProduct(product);
        })
  },[params.id]);


  return (
    <div className="container mx-auto mt-12">
      <button className="mb-12 font-bold cursor-pointer" onClick={() => navigate('/')}>Back</button>
      <div className="flex">
        <img className="w-64 h-64 object-cover rounded-lg"  src={product.image} alt="pizza" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.difficulty}</div>
          <div className="font-bold mt-2">₹ {product.caloriesPerServing}</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct;
