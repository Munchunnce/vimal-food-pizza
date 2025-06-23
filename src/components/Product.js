import { Link } from "react-router-dom";

const Product = (props) => {
  console.log(props);
  const { product } = props;

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
          <button className="bg-yellow-500 py-1 px-4 rounded-full font-bold">
            ADD
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
